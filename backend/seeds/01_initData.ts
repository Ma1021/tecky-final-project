import { Knex } from 'knex';
import { hash } from 'bcrypt';
let users = require('../data/user.json');

let SALT_ROUND = 10;

function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUND);
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('chatroom_record').del();
  await knex('chatroom_user').del();
  await knex('chatrooms').del();

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

  for (let user of users) {
    user.password_hash = await hashPassword(user.password_hash);
    await knex('users').insert(user);
  }

  await knex('notification_type').insert([
    { action_type: 'create question', action_desc: '提出問題：' },
    { action_type: 'create answer', action_desc: '回覆了你：' },
    { action_type: 'follow user', action_desc: '追隨了你' },
  ]);

  // Maggie's part -----------------------------
  // any problems please find maggie
  // create chatroom
  await knex('chatrooms').insert([
    {
      host: 2,
      name: 'user group 2',
      introduction: 'test on intro',
      icon: 'https://stockoverflow-photoss.s3.ap-southeast-1.amazonaws.com/2022-11-25T09%3A07%3A34.009Z_0',
    },
    { host: 3, name: 'user group 3' },
    { host: 4, name: 'user group 4' },
    {
      host: 5,
      name: 'kol group 1',
      introduction: 'join us now!',
      icon: 'https://stockoverflow-photoss.s3.ap-southeast-1.amazonaws.com/2022-11-25T15%3A33%3A59.804Z_0',
    },
    { host: 6, name: 'kol group 2' },
    { host: 7, name: 'kol group 3' },
    { host: 8, name: 'kol group 4' },
    { host: 9, name: 'kol group 5' },
    { host: 10, name: 'kol group 6' },
    { host: 11, name: 'kol group 7' },
    { host: 12, name: 'kol group 8' },
    { host: 13, name: 'kol group 9' },
  ]);
  //-----------------------------------------------------------------------
  // create chatroom member
  let chatroomId = await knex('chatrooms').select('id');
  let userId = await knex('users').select('id');

  // just to check if the user and chatrooom id was created correctly
  // console.log('chatroomId', chatroomId);
  // console.log('userId', userId);

  // all user will join user group 2
  for (let id of userId) {
    if (+id.id == 2) {
      continue;
    }
    await knex('chatroom_user').insert([
      {
        chatroom: +chatroomId[0].id,
        member: +id.id,
        status: 'approved',
      },
    ]);
  }
  // all user will join kol group 13
  for (let id of userId) {
    if (+id.id == 13) {
      continue;
    }
    await knex('chatroom_user').insert([
      {
        chatroom: +chatroomId[chatroomId.length - 1].id,
        member: +id.id,
        status: 'approved',
      },
    ]);
  }
  // 14-5 user will join kol group 2
  for (let i = 5; i < userId.length - 1; i++) {
    if (userId[i].id === 6) continue;
    await knex('chatroom_user').insert([
      {
        chatroom: +chatroomId[4].id,
        member: +userId[i].id,
        status: 'approved',
      },
    ]);
  }
  //-----------------------------------------------------------------------
  // create chatroom record
  //  try one with user
  for (let i = 0; i < userId.length - 1; i++) {
    await knex('chatroom_record').insert([
      {
        record: `hi from ${userId[i].id}`,
        chatroom: +chatroomId[0].id,
        user: +userId[i].id,
      },
    ]);
  }
  // try one  with kol
  for (let i = 0; i < userId.length - 1; i++) {
    await knex('chatroom_record').insert([
      {
        record: `bye from ${userId[i].id}`,
        chatroom: +chatroomId[0].id,
        user: +userId[i].id,
      },
    ]);
  }
}
