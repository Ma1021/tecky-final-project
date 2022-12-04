import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaperTradeService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async placeOrder(
    userID: string,
    stockID: string,
    orderType: string,
    price: string,
    quantity: string,
  ) {
    let orderTypeLong = undefined;
    orderType === 'long' ? (orderTypeLong = true) : (orderTypeLong = false);
    try {
      await this.knex
        .insert({
          user_id: userID,
          stock_id: stockID,
          long: orderTypeLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 0,
        })
        .into('user_trades');
      return { message: 'Place order succeed.' };
    } catch (error) {
      throw new Error('Place order failed.');
    }
  }

  async getInProgressOrderList(userID: string, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.stock_id', 'stock_info.id')
      .where({ user_id: userID, order_complete_time: null, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  async getFullOrderList(userID: string, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'symbol',
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
      .join('stock_info', 'user_trades.stock_id', 'stock_info.id')
      .where({ user_id: userID, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  //   async getCurrentPositionList(userID: string) {
  //     const result = await this.knex.select('*').from('user')
  //   }
}
