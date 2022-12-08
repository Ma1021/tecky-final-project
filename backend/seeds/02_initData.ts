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

  // Inserts seed entries

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

    if (user_id !== following_id) {
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
            // const date = new Date().getDate() - Math.floor(Math.random() * 27);
            const date = 30 - Math.floor(Math.random() * 27);
            // console.log(date);
            // if not exist then insert
            await knex('subscriptions').insert({
              user_id,
              following_id,
              created_at: `2022-11-${date}`,
            });
          }
        });
    }
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
    '食飯時，聽到有路人甲乙吹水，話而家要買定啲收息高股票，儲夠15年一定會賺好多🤭',
    '現在可以買入嗎?',
    '無貨現價可入?',
    '岩岩返家鄉，請問放唔放好？',
    '有貨，應否先止賺？',
    '短炒賺餐飯，買得過嗎？',
    '世界盃可以帶動咩股？',
    '可博嗎？',
    '感覺不妙，好似隨時都會大崩咁！',
    '新低啊，入唔入得過？',
    '仲要跌到邊度？仲要跌幾多？',
    '日日都跌！',
    '可否高追？',
    '跌到咁殘！值唔值得買？有冇人敢買？',
    '有冇人持有依隻股？',
    '最近有咩利好消息？',
    '趁反彈係咪應該要走佬先？',
    '呢隻真係勁！',
    '諗住長線，依隻前景如何？',
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
    '超長遠投資可入，短炒不了',
    '個市調整中，不需要急入貨',
    '揸現金等買優質股，大把靚貨，唔好買埋D垃圾股',
    '玩過山車咁，一日天堂一日地獄',
    '入場要諗用咩做止蝕位，控制好風險',
  ];

  // get all user id without kol and admin
  const normalUser = await knex('users')
    .select('id')
    .where('user_type', 'normal');

  for (let i = 0; i < questionContent.length; i++) {
    const tag_number = await knex('tags').count('tag_id').first();
    const stock_id = [];
    const tag_amount = Math.floor(Math.random() * 4);
    for (let i = 0; i < tag_amount; i++) {
      stock_id.push(stockRes[Math.floor(Math.random() * stockRes.length)].id);
    }
    const asker_id =
      normalUser[Math.floor(Math.random() * normalUser.length)].id;

    if (tag_number.count == 0) {
      if (stock_id[0]) {
        // insert tag id and stock id to tag table
        for (let id of stock_id) {
          await knex('tags').insert({ tag_id: 1, stock_id: id });
        }
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

      if (stock_id[0]) {
        // insert tag id and stock id to tag table
        for (let id of stock_id) {
          await knex('tags').insert({
            tag_id: tag_id + 1,
            stock_id: id,
          });
        }
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
    // chatroom action
    { action_type: 'chatroom chat', action_desc: '你有訊息' },
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
      name: 'user group 5',
      introduction: 'join us now!',
      icon: 'https://stockoverflow-photoss.s3.ap-southeast-1.amazonaws.com/2022-11-25T15%3A33%3A59.804Z_0',
    },
    { host: 6, name: 'user group 6' },
    { host: 7, name: 'user group 7' },
    { host: 8, name: 'user group 8' },
    { host: 9, name: 'user group 9' },
    { host: 10, name: 'user group 10' },
    { host: 11, name: 'user group 11' },
    { host: 12, name: 'user group 12' },
    { host: 13, name: 'user group 13' },
    { host: 14, name: 'user group 14' },
    { host: 15, name: 'user group 15' },
    { host: 16, name: 'user group 16' },
    { host: 17, name: 'user group 17' },
    { host: 18, name: 'user group 18' },
    { host: 19, name: 'user group 19' },
    { host: 20, name: 'user group 20' },
    { host: 21, name: 'kol group 21' },
    { host: 22, name: 'kol group 22' },
    { host: 23, name: 'kol group 23' },
    { host: 24, name: 'kol group 24' },
    { host: 25, name: 'kol group 25' },
    { host: 26, name: 'kol group 26' },
    { host: 27, name: 'kol group 27' },
    { host: 28, name: 'kol group 28' },
    { host: 29, name: 'kol group 29' },
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
  // all user will join kol group 21
  for (let id of userId) {
    if (+id.id == 21) {
      continue;
    }
    await knex('chatroom_user').insert([
      {
        chatroom: +chatroomId[21].id,
        member: +id.id,
        status: 'approved',
      },
    ]);
  }
  // 14-5 user will join kol group 22
  for (let i = 5; i < userId.length - 1; i++) {
    if (userId[i].id === 22) continue;
    await knex('chatroom_user').insert([
      {
        chatroom: +chatroomId[22].id,
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
        chatroom: +chatroomId[21].id,
        user: +userId[i].id,
      },
    ]);
  }
  // try one  with kol - 2
  for (let i = 5; i < userId.length - 1; i++) {
    await knex('chatroom_record').insert([
      {
        record: `bye from ${userId[i].id}`,
        chatroom: +chatroomId[22].id,
        user: +userId[i].id,
      },
    ]);
  }
}
