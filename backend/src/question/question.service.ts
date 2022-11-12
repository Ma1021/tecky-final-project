import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question_Result } from './question.module'
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Question_DTO } from './question.module'

@Injectable()
export class QuestionService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getQuestions() {
    return await this.knex('questions').select('*');
  }

  // get one question by question id
  async getQuestion(question_id: number) {
    return await this.knex('questions').select('*').where('id', question_id);
  }

  // get one or all questions by asker id
  async getAskerQuestions(asker_id: number) {
    return await this.knex('questions').select('*').where('asker_id', asker_id);
  }

  async createQuestion(questions: Question_DTO) {
    const { asker_id, content, stock_id } = questions;

    const tag_number = await this.knex('tag').count("tag_id").first();    

    if(tag_number.count == 0) {
      for(let stockId of stock_id) {
        // insert tag id and stock id to tag table
        await this.knex('tag').insert({tag_id:1, stock_id: stockId});
      }
  
      // insert question to question table
      return await this.knex('questions').insert({asker_id, content, tag_id:1}).returning('id');
    } else {
      let {tag_id} = await this.knex('tag').select('tag_id').orderBy('tag_id', 'desc').first();    

      for(let stockId of stock_id) {
        // insert tag id and stock id to tag table
        await this.knex('tag').insert({tag_id: tag_id+1, stock_id: stockId});
      }
  
      // insert question to question table
      return await this.knex('questions').insert({asker_id, content, tag_id: tag_id+1}).returning('id');
    }
  }

  async updateQuestion(question_id: number,  questions: Question_DTO) {

    const { asker_id, content, tag_id } = questions

    let newIdArr = questions.stock_id
    let oriIdArr = await this.knex('tag').select('stock_id').where('tag_id', tag_id);
    
    for(let stockId of oriIdArr) {
      const {stock_id} = stockId

      if(!newIdArr.includes(stock_id)) {
        // if originId not exist in new id array, del it from tag table
        await this.knex('tag').where('stock_id', stock_id).andWhere('tag_id', tag_id).del();
      } else {
        // if originId exist in new id array, remove the id from new id array
        newIdArr =  newIdArr.filter(id => id != stock_id)
      }
    }

    // insert the new id array which contain the id not exist in origin id array
    for(let stock_id of newIdArr) {
      await this.knex('tag').insert({tag_id, stock_id})
    }

    return await this.knex('questions').where('id', question_id).update({asker_id, content, tag_id});
  }
}