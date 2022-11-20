import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('questions').del();
  await knex('users').del();
  await knex('stocks').del();

  // Inserts seed entries

  await knex('stocks').insert([
    { symbol: 'QQQ', name: 'Invesco QQQ Trust Series 1' },
    { symbol: 'VOO', name: 'Vanguard 500 Index Fund ETF' },
    { symbol: 'AAPL', name: 'Apple Inc. (AAPL)' },
    { symbol: 'TSLA', name: 'Tesla, Inc. (TSLA)' },
  ]);

  await knex('users').insert([{
    username: 'admin',
    email: 'admin@gmail.com',
    password_hash: '123',
    birthday: '2022-11-12T13:00',
    gender: 'F',
    avatar:
      'https://images.fineartamerica.com/images-medium-large-5/wolf-baby-jeanlouis-wertz.jpg',
  },
  {
    username: 'user',
    email: 'user@gmail.com',
    password_hash: '456',
    birthday: '2022-11-12T13:00',
    gender: 'F',
    avatar:
    'https://cdn5.vectorstock.com/i/1000x1000/54/19/gray-wolf-cartoon-wolf-grey-the-nature-vector-20325419.jpg',
  }
]);

  await knex("notification_type").insert([
    {action_type:"create question", action_desc:"提出了問題"},
    {action_type:"create answer", action_desc:"回答了問題"},
    {action_type:"follow user", action_desc:"追隨了你"},
  ])
}
