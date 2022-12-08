import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Question_DTO, Report_DTO } from './question.dto';

@Injectable()
export class QuestionService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  
  async findAll() {
    const questions = await this.knex
    .raw(`
    SELECT questions.id, questions.content, questions.created_at, questions.is_reported,
    users.id as asker_id, users.username as asker_username, users.avatar as asker_avatar, users.user_type, tags.tag_id,
    coalesce(jsonb_agg(DISTINCT jsonb_build_object(
      'id', stocks.id,
      'name', stocks.name,
      'symbol', stocks.symbol
    )) filter (where stocks.* is not null), '[]') as stock,
    coalesce(jsonb_agg(DISTINCT jsonb_build_object(
        'id', answers.id,
        'is_reported', answers.is_reported,
        'content', answers.content,
        'created_at', answers.created_at,
        'answers', (SELECT json_build_object(
            'id', users.id,
            'type', users.user_type,
            'avatar', users.avatar,
            'username', users.username)
            from users where users.id = answers.answerer_id),
        'likes_user_id',(SELECT coalesce(jsonb_agg(to_jsonb(ans_likes.user_id))
        filter (where ans_likes.* is not null), '[]') 
        from ans_likes where ans_likes.answer_id = answers.id))
        ) filter (where answers.* is not null), '[]') as answer
    from questions
    inner join tags on questions.tag_id = tags.tag_id 
    full outer join stocks on tags.stock_id = stocks.id
    inner join users on users.id = questions.asker_id
    full outer join answers on questions.id = answers.question_id
    where questions.is_ban = false
    group by questions.id, users.id, tags.tag_id
    order by questions.created_at desc;
    `);

    return questions.rows;
  }

  // get one question by question id
  async findOne(question_id: number) {
    const question = await this.knex.raw(`
      SELECT questions.id, questions.content, questions.created_at, questions.is_reported,
      users.id as asker_id, users.username as asker_username, users.avatar as asker_avatar, users.user_type, tags.tag_id,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
        'id', stocks.id,
        'name', stocks.name,
        'symbol', stocks.symbol
      )) filter (where stocks.* is not null), '[]') as stock,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
          'id', answers.id,
          'is_reported', answers.is_reported,
          'content', answers.content,
          'created_at', answers.created_at,
          'answers', (SELECT json_build_object(
              'id', users.id,
              'type', users.user_type,
              'avatar', users.avatar,
              'username', users.username)
              from users where users.id = answers.answerer_id),
          'likes_user_id',(SELECT coalesce(jsonb_agg(to_jsonb(ans_likes.user_id))
          filter (where ans_likes.* is not null), '[]') 
          from ans_likes where ans_likes.answer_id = answers.id))) filter (where answers.* is not null), '[]') as answer
      from questions
      inner join tags on questions.tag_id = tags.tag_id 
      full outer join stocks on tags.stock_id = stocks.id
      inner join users on users.id = questions.asker_id
      full outer join answers on questions.id = answers.question_id
      where questions.id = ? and questions.is_ban = false
      group by questions.id, users.id, tags.tag_id
      order by questions.created_at desc;
      `,
      [question_id],
    );

    return question.rows;
  }
  
  // get one or all questions by asker id
  async findAskerQuestions(asker_id: number) {
    const questions = await this.knex.raw(`
      SELECT questions.id, questions.content, questions.created_at, questions.is_reported,
      users.id as asker_id, users.username as asker_username, users.avatar as asker_avatar, users.user_type, tags.tag_id,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
        'id', stocks.id,
        'name', stocks.name,
        'symbol', stocks.symbol
      )) filter (where stocks.* is not null), '[]') as stock,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
          'id', answers.id,
          'is_reported', answers.is_reported,
          'content', answers.content,
          'created_at', answers.created_at,
          'answers', (SELECT json_build_object(
              'id', users.id,
              'type', users.user_type,
              'avatar', users.avatar,
              'username', users.username)
              from users where users.id = answers.answerer_id),
          'likes_user_id',(SELECT coalesce(jsonb_agg(to_jsonb(ans_likes.user_id))
          filter (where ans_likes.* is not null), '[]') 
          from ans_likes where ans_likes.answer_id = answers.id))) filter (where answers.* is not null), '[]') as answer
      from questions
      inner join tags on questions.tag_id = tags.tag_id 
      full outer join stocks on tags.stock_id = stocks.id
      inner join users on users.id = questions.asker_id
      full outer join answers on questions.id = answers.question_id
      where questions.asker_id = ? and questions.is_ban = false
      group by questions.id, users.id, tags.tag_id
      order by questions.created_at desc;
    `,
      [asker_id],
    );
    return questions.rows;
  }

  // get one or all questions by answerer id
  async findAnswererQuestions(answerer_id: number) {
    const questions = await this.knex.raw(`
    SELECT questions.id, questions.content, questions.created_at, questions.is_reported,
    users.id as asker_id, users.username as asker_username, users.avatar as asker_avatar, users.user_type ,tags.tag_id,
    coalesce(jsonb_agg(DISTINCT jsonb_build_object(
      'id', stocks.id,
      'name', stocks.name,
      'symbol', stocks.symbol
    )) filter (where stocks.* is not null), '[]') as stock,
    coalesce(jsonb_agg(DISTINCT jsonb_build_object(
      'id', answers.id,
      'is_reported', answers.is_reported,
      'content', answers.content,
      'created_at', answers.created_at,
      'answers', (SELECT json_build_object(
          'id', users.id,
          'type', users.user_type,
          'avatar', users.avatar,
          'username', users.username)
          from users where users.id = answers.answerer_id),
      'likes_user_id',(SELECT coalesce(jsonb_agg(to_jsonb(ans_likes.user_id))
      filter (where ans_likes.* is not null), '[]') 
      from ans_likes where ans_likes.answer_id = answers.id))) filter (where answers.* is not null), '[]') as answer
    from questions
    inner join tags on questions.tag_id = tags.tag_id 
    full outer join stocks on tags.stock_id = stocks.id
    inner join users on users.id = questions.asker_id
    full outer join answers on questions.id = answers.question_id
    where answers.answerer_id = ? and questions.is_ban = false
    group by questions.id, users.id, tags.tag_id
    order by questions.created_at desc;
  `,
  [answerer_id]
  );
  return questions.rows;
  }

  // get all questions by stock symbol
  async findQuestionBySymbol(symbol: string) {    
    const questions = await this.knex
    .raw(`
      SELECT questions.id, questions.content, questions.created_at, questions.is_reported,
      users.id as asker_id, users.username as asker_username, users.avatar as asker_avatar, users.user_type, tags.tag_id,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
        'id', stocks.id,
        'name', stocks.name,
        'symbol', stocks.symbol
      )) filter (where stocks.* is not null), '[]') as stock,
      coalesce(jsonb_agg(DISTINCT jsonb_build_object(
          'id', answers.id,
          'is_reported', answers.is_reported,
          'content', answers.content,
          'created_at', answers.created_at,
          'answers', (SELECT json_build_object(
              'id', users.id,
              'type', users.user_type,
              'avatar', users.avatar,
              'username', users.username)
              from users where users.id = answers.answerer_id),
          'likes_user_id',(SELECT coalesce(jsonb_agg(to_jsonb(ans_likes.user_id))
          filter (where ans_likes.* is not null), '[]') 
          from ans_likes where ans_likes.answer_id = answers.id))
          ) filter (where answers.* is not null), '[]') as answer
      from questions
      inner join tags on questions.tag_id = tags.tag_id 
      full outer join stocks on tags.stock_id = stocks.id
      inner join users on users.id = questions.asker_id
      full outer join answers on questions.id = answers.question_id
      where stocks.symbol = ? and questions.is_ban = false
      group by questions.id, users.id, tags.tag_id
      order by questions.created_at desc;
    `, [symbol]);

    return questions.rows;
  }

  async create(questions: Question_DTO) {
    try {      
      const { asker_id, content, stock_id } = questions;
      
      const tag_number = await this.knex('tags').count('tag_id').first();

      if (tag_number.count == 0) {
        if (stock_id) {
          for (let stockId of stock_id) {
            // insert tag id and stock id to tag table
            await this.knex('tags').insert({ tag_id: 1, stock_id: stockId });
          }
        } else {
          await this.knex('tags').insert({ tag_id: 1, stock_id: null });
        }
        // insert question to question table
        return await this.knex('questions')
          .insert({ asker_id, content, tag_id: 1 })
          .returning('id');
      } else {
        let { tag_id } = await this.knex('tags')
          .select('tag_id')
          .orderBy('tag_id', 'desc')
          .first();

        if (stock_id) {
          for (let stockId of stock_id) {
            // insert tag id and stock id to tag table
            await this.knex('tags').insert({
              tag_id: tag_id + 1,
              stock_id: stockId,
            });
          }
        } else {
          await this.knex('tags').insert({
            tag_id: tag_id + 1,
            stock_id: null,
          });
        }
        // insert question to question table
        return await this.knex('questions').insert({ asker_id, content, tag_id: tag_id + 1 }).returning('id');
      }
    } catch (err) {
      console.log('error:', err);
    }
  }

  async delete(question_id: number) {
    await this.knex('answers').where('question_id', question_id).del();
    return await this.knex('questions').where('id', question_id).del();
  }

  report(report: Report_DTO) {
    try {
    //mark question as reported status
    this.knex('questions').update('is_reported', true).where('id', report.target_id).then((response)=>{
      // insert report record to reports table
      if(response === 1) {
        return this.knex('reports').insert(report);
      }
    })  
    } catch(err) {
      console.log('report question:', err);
    }
  }

  async symbol() {
    try {
      const stocks = ['AAPL', 'TSLA', 'NFLX', 'XPEV', 'BABA', 'BILI', 'TSM', 'FUTU', 'AMZN', 'AMD']
      const stockRes = [];

      for(let stock of stocks) {
        const res = await this.knex('stocks').select('id as stock_id', 'symbol as stock_symbol', 'name as stock_name').where('symbol', stock)
        stockRes.push(res[0]);
      }

      return stockRes;
    } catch(err) {
      console.log('get symbol', err);
    }
  }
}
