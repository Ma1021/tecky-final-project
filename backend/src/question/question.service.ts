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

  async getQuestion(question_id: number) {
    return await this.knex('questions').select('*').where('id', question_id);
  }

  async createQuestion(questions: Question_DTO) {
    return await this.knex('questions').insert(questions).returning('id');
  }

  async updateQuestion(question_id: number,  questions: Question_DTO) {
      return await this.knex('question').where('id', question_id).update(questions);
  }
}