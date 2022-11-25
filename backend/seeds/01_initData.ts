import { Knex } from 'knex';
import { hash } from 'bcrypt';
let users = require('../data/user.json')

let SALT_ROUND = 10;

function hashPassword(password:string):Promise<string> {
  return hash(password, SALT_ROUND)
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('questions').del();
  await knex('users').del();
  await knex('stocks').del();

  // Inserts seed entries
  
  await knex('stocks').insert([
    { symbol: 'QQQ', name: 'Invesco QQQ Trust Series 1'},
    { symbol: 'VOO', name: 'Vanguard 500 Index Fund ETF'},
    { symbol: 'AAPL', name: 'Apple Inc. (AAPL)'},
    { symbol: 'TSLA', name: 'Tesla, Inc. (TSLA)'},
  ]);

  for(let user of users) {
    user.password_hash = await hashPassword(user.password_hash);
    await knex('users').insert(user);
  }

  await knex("notification_type").insert([
    {action_type:"create question", action_desc:"提出問題："},
    {action_type:"create answer", action_desc:"回覆了你："},
    {action_type:"follow user", action_desc:"追隨了你"},
  ])
}
