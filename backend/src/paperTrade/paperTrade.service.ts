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
    let orderTypeLong = undefined;
    orderType === 'long' ? (orderTypeLong = true) : (orderTypeLong = false);
    try {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: orderTypeLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 0,
          account: account,
        })
        .into('user_trades');

      const positionResult = await this.knex
        .select('*')
        .from('user_positions')
        .where({ symbol: symbol });

      if (positionResult.length === 0) {
        await this.knex
          .insert({
            user_id: userID,
            symbol: symbol,
            long: orderTypeLong,
            cost: price,
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

      const {
        principal,
        market_value,
        buying_power,
        today_profit,
        total_profit,
      } = (
        await this.knex
          .select([
            'principal',
            'market_value',
            'buying_power',
            'today_profit',
            'total_profit',
          ])
          .from('user_paper_trade_accounts')
          .where({ user_id: userID, account: account })
      )[0];
      let newPrincipal = 0,
        newMarketValue = 0,
        newBuyingPower = 0,
        newTodayProfit = 0,
        newTotalProfit = 0;

      newMarketValue = market_value + quantity * price;
      newBuyingPower = buying_power - quantity * price;
      newPrincipal = newMarketValue + newBuyingPower;
      newTotalProfit = newPrincipal - 1000000;

      await this.knex
        .update({
          principal: newPrincipal,
          market_value: newMarketValue,
          buying_power: newBuyingPower,
          today_profit: newTodayProfit,
          total_profit: newTotalProfit,
        })
        .from('user_paper_trade_accounts')
        .where({ user_id: userID, account: account });

      return { message: 'Place order succeed.' };
    } catch (error) {
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

  async cancelOrder(id: string) {
    try {
      await this.knex
        .update({ order_status: 2, order_complete_time: new Date() })
        .from('user_trades')
        .where({ id: id });
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
      .where({ user_id: userID });

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

  async updateAccountDetail(
    userID: string,
    marketValue: number,
    buyingPower: number,
    todayProfit: number,
    account: string,
  ) {
    await this.knex
      .update({
        market_value: marketValue,
        buying_power: buyingPower,
        today_profit: todayProfit,
      })
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });
  }
}
