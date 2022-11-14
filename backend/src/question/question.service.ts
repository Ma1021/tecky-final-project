import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Question_DTO } from './question.module'

@Injectable()
export class QuestionService {
  constructor(@InjectModel() private readonly knex: Knex) { }

  async findAll() {
    const questions = await this.knex.raw
      (`select questions.id, questions.content, questions.created_at at time zone 'utc+8' as created_at, users.username as asker_username, users.avatar as asker_avatar, tags.tag_id, jsonb_agg(to_jsonb(stocks)) as stock 
    from questions
    inner join tags on questions.tag_id = tags.tag_id 
    full outer join stocks on tags.stock_id = stocks.id
    inner join users on users.id = questions.asker_id
    group by questions.id, users.username, users.avatar, tags.tag_id`)

    return questions.rows
  }

  // get one question by question id
  async findOne(question_id: number) {
    const question = await this.knex.raw
      (`select questions.id, questions.content, questions.created_at, users.username as asker_username, users.avatar as asker_avatar, tags.tag_id, jsonb_agg(to_jsonb(stocks)) as stock
    from questions
    inner join tags on questions.tag_id = tags.tag_id 
    full outer join stocks on tags.stock_id = stocks.id
    inner join users on users.id = questions.asker_id
    where questions.id = ${question_id}
    group by questions.id, users.username, users.avatar, tags.tag_id`);
    
    return question.rows
  }

  // get one or all questions by asker id
  async findAskerQuestions(asker_id: number) {
    const questions = await this.knex.raw
      (`select questions.id, questions.content, questions.created_at, users.username as asker_username, users.avatar as asker_avatar, tags.tag_id, jsonb_agg(to_jsonb(stocks)) as stock
    from questions
    inner join tags on questions.tag_id = tags.tag_id 
    full outer join stocks on tags.stock_id = stocks.id
    inner join users on users.id = questions.asker_id
    where questions.asker_id = ${asker_id}
    group by questions.id, users.username, users.avatar, tags.tag_id`);

    return questions.rows
  }

  async create(questions: Question_DTO) {
    try {
      const { asker_id, content, stock_id } = questions;

      const tag_number = await this.knex('tags').count("tag_id").first();

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
        return await this.knex('questions').insert({ asker_id, content, tag_id: 1 }).returning('id');  
      } else {
        let { tag_id } = await this.knex('tags').select('tag_id').orderBy('tag_id', 'desc').first();

        if (stock_id) {
          for (let stockId of stock_id) {
            // insert tag id and stock id to tag table
            await this.knex('tags').insert({ tag_id: tag_id + 1, stock_id: stockId });
          }
        } else {
          await this.knex('tags').insert({ tag_id: tag_id + 1, stock_id: null });
        }
        // insert question to question table
        return await this.knex('questions').insert({ asker_id, content, tag_id: tag_id + 1 }).returning('id');        
      }
    } catch (err) {
      console.log('error:', err);
    }
  }

  async update(question_id: number, questions: Question_DTO) {

    const { asker_id, content, tag_id } = questions

    let newIdArr = questions.stock_id
    let oriIdArr = await this.knex('tags').select('stock_id').where('tag_id', tag_id);

    for (let stockId of oriIdArr) {
      const { stock_id } = stockId

      if (!newIdArr.includes(stock_id)) {
        // if originId not exist in new id array, del it from tag table
        await this.knex('tags').where('stock_id', stock_id).andWhere('tag_id', tag_id).del();
      } else {
        // if originId exist in new id array, remove the id from new id array
        newIdArr = newIdArr.filter(id => id != stock_id)
      }
    }

    // insert the new id array which contain the id not exist in origin id array
    for (let stock_id of newIdArr) {
      await this.knex('tags').insert({ tag_id, stock_id })
    }

    return await this.knex('questions').where('id', question_id).update({ asker_id, content, tag_id }).returning('*');
  }

  async delete(question_id: number) {
    return await this.knex('questions').where('id', question_id).del();
  }
}