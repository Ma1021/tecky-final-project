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
    user_type: 'admin',
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
  },
  {
    username: 'kol',
    user_type: 'kol',
    email: 'kol@gmail.com',
    password_hash: '789',
    birthday: '2022-11-21T11:00',
    gender: 'F',
    introduction: '金融獵豹，人稱豹姐',
    avatar:
    'https://scontent-hkg4-1.xx.fbcdn.net/v/t39.30808-6/260252262_3121808114767525_3237799065672652954_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=0yJQyK_QPqcAX-M0XVp&_nc_ht=scontent-hkg4-1.xx&oh=00_AfCND-3quiMRdQ1LYFIeeJLF3Au_CNjefgda4jkmnsryBg&oe=637F5363',
  }
]);

  await knex("notification_type").insert([
    {action_type:"create question", action_desc:"提出問題："},
    {action_type:"create answer", action_desc:"回覆了你："},
    {action_type:"follow user", action_desc:"追隨了你"},
  ])
}
