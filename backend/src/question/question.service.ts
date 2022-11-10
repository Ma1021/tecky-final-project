import { Body, Injectable } from '@nestjs/common';
import { Question_Result } from './question.module'
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';

interface Questions_DTO {
  asker_id: number,
  content: string, 
  tag_id?: Array<number>
}

@Injectable()
export class QuestionService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  getQuestions(): Array<Question_Result> {
    return [
      {
        id: 1,
        asker_id: 1,
        asker_username: 'heiman',
        asker_avatar: 'https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703-768x535.jpeg',
        asker_content: 'hello',
        answerer_id: 2,
        answerer_username: 'man',
        answerer_avatar: 'https://moderncat.com/wp-content/uploads/2014/03/tortoiseshell-kitten-closeup-p-46771525-940x640.jpg',
        answerer_content: 'hello',
        tags: [{
          tag_id: 1,
          tag_name: '#VOO'
        }],
        created_time: '2022-11-6'
      }
    ]
  }

  async createQuestion(questions: Questions_DTO) {
    return await this.knex.table('questions').insert(questions);
  }
}