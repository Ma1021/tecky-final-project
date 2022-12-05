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
        userID.toString(),
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power,
        totalProfit = selectResult[0].total_profit;

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
        totalProfit,
        account,
      );

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

      console.log(order_price, quantity);

      const selectResult = await this.getIndividualAccountDetail(
        userID.toString(),
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power,
        totalProfit = selectResult[0].total_profit;

      console.log('quantity', quantity);
      console.log('order_price', order_price);

      const currentTransaction = quantity * order_price;

      const newBuyingPower = buyingPower + currentTransaction;
      console.log('newBuyingPower', newBuyingPower);

      await this.updateAccountDetail(
        userID,
        marketValue,
        newBuyingPower,
        totalProfit,
        account,
      );

      return { message: 'Order cancelled.' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getInProgressOrderList(userID: string, account: string) {
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
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, order_complete_time: null, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  async getFullOrderList(userID: string, account: string) {
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

  async getPositionList(userID: string, account: string) {
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

  async getIndividualAccountDetail(userID: string, account: string) {
    const result = await this.knex
      .select('*')
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });

    return result;
  }

  async getAccountList(userID: string) {
    const result = await this.knex
      .select(['principal', 'total_profit', 'account'])
      .from('user_paper_trade_accounts')
      .where({ user_id: userID })
      .orderBy('id', 'asc');

    const newResult = [];

    result.map((obj) => {
      const total_profit_percentage = (obj.total_profit / 1000000) * 100;

      const newObj = {
        account: obj.account,
        principal: obj.principal,
        total_profit: obj.total_profit,
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
    }
  }

  async updateAccountDetail(
    userID: number,
    newMarketValue: number,
    newBuyingPower: number,
    newTotalProfit: number,
    account: string,
  ) {
    const newPrincipal = newMarketValue + newBuyingPower;
    await this.knex
      .update({
        principal: newPrincipal,
        market_value: newMarketValue,
        buying_power: newBuyingPower,
        total_profit: newTotalProfit,
      })
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });
  }
}
