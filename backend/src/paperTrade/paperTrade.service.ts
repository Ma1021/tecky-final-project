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
      this.knex.insert([
        { user_id: userID },
        { stock_id: stockID },
        { long: orderTypeLong },
        { order_price: price },
        { quantity: quantity },
        { order_place_time: new Date() },
        { order_status: 0 },
      ]);
      return 'Place order succeed.';
    } catch (error) {
      throw new Error('Place order failed.');
    }
  }
}
