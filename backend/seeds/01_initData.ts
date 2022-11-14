import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('questions').del();
  await knex('users').del();
  await knex('stocks').del();
  await knex('user_types').del();

  // Inserts seed entries
  await knex('user_types').insert([
    { type: 'normal' },
    { type: 'kol' },
    { type: 'admin' },
  ]);

  await knex('stocks').insert([
    { symbol: 'QQQ', name: 'Invesco QQQ Trust Series 1' },
    { symbol: 'VOO', name: 'Vanguard 500 Index Fund ETF' },
    { symbol: 'AAPL', name: 'Apple Inc. (AAPL)' },
    { symbol: 'TSLA', name: 'Tesla, Inc. (TSLA)' },
  ]);

  await knex('users').insert({
    username: 'admin',
    email: 'admin@gmail.com',
    password_hash: '123',
    user_type_id: 1,
    birthday: '2022-11-12T13:00',
    gender: 'F',
    avatar:
      'https://images.fineartamerica.com/images-medium-large-5/wolf-baby-jeanlouis-wertz.jpg',
  });
}
