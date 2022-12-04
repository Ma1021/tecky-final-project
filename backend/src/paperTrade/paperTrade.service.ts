import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaperTradeService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async placeNewOrder(
    userID: string,
    symbol: string,
    orderType: string,
    price: string,
    quantity: string,
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

      const result = await this.knex
        .select('*')
        .from('user_positions')
        .where({ symbol: symbol });

      if (result.length === 0) {
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
        newQuantity = result[0].quantity + parseInt(quantity);
        newCost =
          (parseFloat(result[0].cost) * result[0].quantity +
            parseFloat(price) * parseInt(quantity)) /
          newQuantity;

        await this.knex
          .update({ cost: newCost, quantity: newQuantity })
          .from('user_positions')
          .where({ symbol: symbol });
      }

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

    return result;
  }

  async getAccountDetail(userID: string, account: string) {
    const result = await this.knex
      .select('*')
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });
    return result;
  }
}
