import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaperTradeService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async placeOrder(
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
      return { message: 'Place order succeed.' };
    } catch (error) {
      throw new Error('Place order failed.');
    }
  }

  async deleteOrder(id: string) {
    try {
      await this.knex.delete('*').from('user_trades').where({ id: id });
      return { message: 'Order deleted.' };
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
        'symbol',
        'name',
        'chinese_name',
        'cost',
        'user_positions.current_price',
        'quantity',
      ])
      .from('user_positions')
      .join('stock_info', 'user_positions.stock_id', 'stock_info.id')
      .where({ user_id: userID, account: account });

    return result;
  }
}
