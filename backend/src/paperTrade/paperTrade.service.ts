import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaperTradeService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async placeOrder(
    userID: number,
    symbol: string,
    orderType: string,
    price: number,
    quantity: number,
    account: string,
  ) {
    let isLong = undefined;
    orderType === 'long' ? (isLong = true) : (isLong = false);
    try {
      await this.insertUserTradeRecord(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power;

      const currentTransaction = quantity * price;
      let newBuyingPower = 0;
      if (isLong) {
        newBuyingPower = buyingPower - currentTransaction;
      } else {
        newBuyingPower = buyingPower + currentTransaction;
      }

      await this.updateAccountDetail(
        userID,
        marketValue,
        newBuyingPower,
        account,
      );

      // this.completeOrder(userID, symbol, isLong, price, quantity, account);

      return { message: 'Place order succeed.' };
    } catch (error) {
      console.log(error);
      throw new Error('Place order failed.');
    }
  }

  async closePosition(
    id: number,
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 0,
          account: account,
        })
        .into('user_trades');

      await this.knex.delete('*').from('user_positions').where({ id: id });
      return { message: 'Position closed.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async cancelOrder(orderID: number, userID: number, account: string) {
    try {
      const { order_price, quantity } = (
        await this.knex
          .update({ order_status: 2, order_complete_time: new Date() })
          .from('user_trades')
          .where({ id: orderID })
          .returning(['order_price', 'quantity'])
      )[0];

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power;

      const currentTransaction = quantity * order_price;

      const newBuyingPower = buyingPower + currentTransaction;

      await this.updateAccountDetail(
        userID,
        marketValue,
        newBuyingPower,
        account,
      );

      return { message: 'Order cancelled.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async completeOrder(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.updateUserTradeRecord(symbol);

      await this.insertOrUpdateUserPosition(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power,
        totalProfit = selectResult[0].total_profit;

      const currentTransaction = quantity * price;
      let newMarketValue = 0;
      if (isLong) {
        newMarketValue = marketValue + currentTransaction;
      } else {
        newMarketValue = marketValue - currentTransaction;
      }

      await this.updateAccountDetail(
        userID,
        newMarketValue,
        buyingPower,
        account,
      );

      return { message: 'Order completed.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // async getInProgressOrderList(userID: number, account: string) {
  //   const result = await this.knex
  //     .select([
  //       'user_trades.id',
  //       'user_trades.symbol',
  //       'name',
  //       'chinese_name',
  //       'long',
  //       'order_price',
  //       'quantity',
  //       'order_place_time',
  //       'order_status',
  //     ])
  //     .from('user_trades')
  //     .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
  //     .where({ user_id: userID, order_complete_time: null, account: account })
  //     .orderBy('order_place_time', 'desc');

  //   return result;
  // }

  async getRecentOrderList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'user_trades.symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
        'order_complete_time',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account })
      .orderBy('order_place_time', 'desc')
      .limit(5);

    return result;
  }

  async getFullOrderList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'user_trades.symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
        'order_complete_time',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  async getPositionList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_positions.id',
        'user_positions.symbol',
        'long',
        'name',
        'chinese_name',
        'cost',
        'user_positions.current_price',
        'quantity',
      ])
      .from('user_positions')
      .join('stock_info', 'user_positions.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account });

    const resultArray = [];
    let totalMarketValue = 0;
    result.forEach(
      (obj) =>
        (totalMarketValue =
          totalMarketValue + obj.quantity * parseFloat(obj.current_price)),
    );

    result.map((obj) => {
      const marketValue = obj.quantity * parseFloat(obj.current_price);
      const profit =
        (parseFloat(obj.current_price) - parseFloat(obj.cost)) * obj.quantity;
      const profitPercentage =
        (profit / parseFloat(obj.cost) / obj.quantity) * 100;
      const ratio = (marketValue / totalMarketValue) * 100;

      resultArray.push({
        id: obj.id,
        symbol: obj.symbol,
        long: obj.long,
        name: obj.name,
        chineseName: obj.chinese_name,
        cost: parseFloat(obj.cost),
        marketValue: marketValue,
        currentPrice: parseFloat(obj.current_price),
        quantity: obj.quantity,
        profit: profit,
        profitPercentage: profitPercentage,
        ratio: ratio,
      });
    });
    return resultArray;
  }

  async getIndividualAccountDetail(userID: number, account: string) {
    const result = await this.knex
      .select('*')
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });

    return result;
  }

  async getAccountList(userID: number) {
    const result = await this.knex
      .select(['id', 'market_value', 'buying_power', 'account'])
      .from('user_paper_trade_accounts')
      .where({ user_id: userID })
      .orderBy('id', 'asc');

    const newResult = [];

    result.map((obj) => {
      const principal = result[0].market_value + result[0].buying_power;
      const total_profit = principal - 1000000;
      const total_profit_percentage = (total_profit / 1000000) * 100;

      const newObj = {
        id: obj.id,
        account: obj.account,
        principal: principal,
        total_profit: total_profit,
        total_profit_percentage: total_profit_percentage,
      };
      newResult.push(newObj);
    });

    return newResult;
  }

  async insertUserTradeRecord(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 0,
          account: account,
        })
        .into('user_trades');

      return { message: 'User trade record inserted.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUserTradeRecord(symbol: string) {
    try {
      // fetch to get current price of specific stock
      const currentPrice = 100;

      await this.knex
        .update({ order_status: 1, order_complete_time: new Date() })
        .from('user_trades')
        .where({ symbol: symbol })
        .andWhere('order_price', '<=', currentPrice);

      return { message: 'User trade records updated.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async insertOrUpdateUserPosition(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    const positionResult = await this.knex
      .select('*')
      .from('user_positions')
      .where({ symbol: symbol, account: account });

    if (positionResult.length === 0) {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          cost: price,
          current_price: 50,
          quantity: quantity,
          account: account,
        })
        .into('user_positions');

      return { message: 'User position inserted.' };
    } else {
      let newQuantity = 0;
      let newCost = 0;
      newQuantity = positionResult[0].quantity + quantity;
      newCost =
        (parseFloat(positionResult[0].cost) * positionResult[0].quantity +
          price * quantity) /
        newQuantity;

      await this.knex
        .update({ cost: newCost, quantity: newQuantity })
        .from('user_positions')
        .where({ symbol: symbol });

      return { message: 'User position updated.' };
    }
  }

  async updateAccountDetail(
    userID: number,
    newMarketValue: number,
    newBuyingPower: number,
    account: string,
  ) {
    try {
      await this.knex
        .update({
          market_value: newMarketValue,
          buying_power: newBuyingPower,
        })
        .from('user_paper_trade_accounts')
        .where({ user_id: userID, account: account });

      return { message: 'Account detail updated.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
