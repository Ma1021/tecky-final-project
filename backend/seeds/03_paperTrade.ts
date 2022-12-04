import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_positions').del();
  await knex('user_trades').del();

  // Inserts seed entries
  await knex('user_positions').insert([
    {
      id: 1,
      user_id: 1,
      stock_id: 1,
      cost: 60,
      current_price: 100,
      quantity: 20,
    },
    {
      id: 2,
      user_id: 1,
      stock_id: 2,
      cost: 10,
      current_price: 5,
      quantity: 100,
    },
    {
      id: 3,
      user_id: 1,
      stock_id: 3,
      cost: 50,
      current_price: 50,
      quantity: 50,
    },
  ]);

  await knex('user_trades').insert([
    {
      id: 1,
      user_id: 1,
      stock_id: 1,
      long: true,
      order_price: 60,
      quantity: 20,
      order_place_time: new Date('2022-11-02'),
      order_status: 1,
      order_complete_time: new Date('2022-11-02'),
    },
    {
      id: 2,
      user_id: 1,
      stock_id: 2,
      long: true,
      order_price: 10,
      quantity: 100,
      order_place_time: new Date('2022-11-03'),
      order_status: 1,
      order_complete_time: new Date('2022-11-03'),
    },
    {
      id: 3,
      user_id: 1,
      stock_id: 3,
      long: true,
      order_price: 50,
      quantity: 50,
      order_place_time: new Date('2022-11-04'),
      order_status: 1,
      order_complete_time: new Date('2022-11-04'),
    },
    {
      id: 4,
      user_id: 1,
      stock_id: 1,
      long: true,
      order_price: 110,
      quantity: 20,
      order_place_time: new Date('2022-11-10'),
      order_status: 0,
    },
    {
      id: 5,
      user_id: 1,
      stock_id: 2,
      long: true,
      order_price: 8,
      quantity: 100,
      order_place_time: new Date('2022-11-10'),
      order_status: 2,
      order_complete_time: new Date('2022-11-10'),
    },
  ]);
}
