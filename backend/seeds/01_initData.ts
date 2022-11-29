import { Knex } from 'knex';
import { hash } from 'bcrypt';
let users = require('../data/user.json');

let SALT_ROUND = 10;

function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUND);
}

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('subscriptions').del();
  await knex('notification').del();
  await knex('notification_object').del();
  await knex('ans_likes').del();
  await knex('answers').del();
  await knex('chatroom_record').del();
  await knex('chatroom_user').del();
  await knex('chatrooms').del();
  await knex('questions').del();
  await knex('users').del();
  await knex('tags').del();
  await knex('stocks').del();

  // Inserts seed entries

  await knex('stocks').insert([
    { symbol: 'QQQ', name: 'Invesco QQQ Trust Series 1' },
    { symbol: 'VOO', name: 'Vanguard 500 Index Fund ETF' },
    { symbol: 'AAPL', name: 'Apple Inc. (AAPL)' },
    { symbol: 'TSLA', name: 'Tesla, Inc. (TSLA)' },
  ]);

  // Insert users
  for (let user of users) {
    user.password_hash = await hashPassword(user.password_hash);
    await knex('users').insert(user);
  }

  // get all user id
  const userRes = await knex('users').select('id');
  const user_idArray = userRes.slice(1); // without admin

  //Insert subscriptions
  for (let x = 0; x < 500; x++) {
    //random a user id and following id between 0 to user array length
    const user_id =
      user_idArray[Math.floor(Math.random() * user_idArray.length)].id;
    const following_id =
      user_idArray[Math.floor(Math.random() * user_idArray.length)].id;

    // checking the subscription peer is existed or not
    await knex('subscriptions')
      .select('*')
      .where('user_id', user_id)
      .andWhere('following_id', following_id)
      .then(async (subscription) => {
        if (subscription.length > 0) {
          // if existed do nothing
          return;
        } else {
          // random a date within 30 days
          const date = new Date().getDate() - Math.floor(Math.random() * 27);
          // if not exist then insert
          await knex('subscriptions').insert({
            user_id,
            following_id,
            created_at: `2022-11-${date}`,
          });
        }
      });
  }

  //Insert questions and answer start

  async function insertAnswer(question_id: number, asker_id: number) {
    // random a answer amount
    const amount = Math.floor(Math.random() * 6);
    for (let i = 0; i < amount; i++) {
      const content =
        answerContent[Math.floor(Math.random() * answerContent.length)];
      const answerer_id =
        user_idArray[Math.floor(Math.random() * user_idArray.length)].id;

      if (asker_id === answerer_id) {
        return;
      }

      await knex('answers').insert({
        answerer_id,
        question_id,
        content,
      });
    }
  }

  // get all stock id
  const stockRes = await knex('stocks').select('id');
  const questionContent = [
    '依隻可以買嗎？',
    '點睇呢隻🙏',
    '可以入嗎？',
    '請問咩價位可以入？謝謝',
    '請問美股依家到底未，有咩股推介',
    '想開始月供股票，有咩推介？',
    '想買收息股，邊隻好？',
    '元宇宙仲有冇前景？',
  ];

  const answerContent = [
    '依隻可以隨時買入都得',
    '可以用平均成本法，每月少量買入',
    '依家波動較大的市況下，比較適合即日短炒，風險相對較低',
    '可以每月少量買入QQQ或VOO',
    '科技股現時風險較高，特別係一d小型公司，有倒閉既風險',
    '長線黎睇仲有得跌，可以再等等再入市',
    '現階段保本為主要目標',
    '唔好買住，市況未穩',
    '長線既話可以入，短線唔好入住',
  ];

  // get all user id without kol and admin
  const normalUser = await knex('users')
    .select('id')
    .where('user_type', 'normal');

  for (let i = 0; i < questionContent.length; i++) {
    const tag_number = await knex('tags').count('tag_id').first();
    const stock_id = stockRes[Math.floor(Math.random() * stockRes.length)].id;
    const asker_id =
      normalUser[Math.floor(Math.random() * normalUser.length)].id;

    if (tag_number.count == 0) {
      if (stock_id) {
        // insert tag id and stock id to tag table
        await knex('tags').insert({ tag_id: 1, stock_id });
      } else {
        await knex('tags').insert({ tag_id: 1, stock_id: null });
      }
      // insert question to question table and get the question id
      const question_id = await knex('questions')
        .insert({ asker_id, content: questionContent[i], tag_id: 1 })
        .returning('id');

      // insert answer
      insertAnswer(question_id[0].id, asker_id);
    } else {
      let { tag_id } = await knex('tags')
        .select('tag_id')
        .orderBy('tag_id', 'desc')
        .first();

      if (stock_id) {
        // insert tag id and stock id to tag table
        await knex('tags').insert({
          tag_id: tag_id + 1,
          stock_id,
        });
      } else {
        await knex('tags').insert({
          tag_id: tag_id + 1,
          stock_id: null,
        });
      }
      // insert question to question table and get the question id
      const question_id = await knex('questions')
        .insert({ asker_id, content: questionContent[i], tag_id: tag_id + 1 })
        .returning('id');

      // insert answer
      insertAnswer(question_id[0].id, asker_id);
    }
  }
  //Insert questions end

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
