import { Injectable } from '@nestjs/common';
import { Question_Result } from './question.module'

@Injectable()
export class QuestionService {
  getQuestions(): Array<Question_Result> {
    return [
        {
            id:1,
            asker_id:1,
            asker_username:'heiman',
            asker_avatar:'https://www.cesarsway.com/wp-content/uploads/2019/10/AdobeStock_190562703-768x535.jpeg',
            asker_content: 'hello',
            answerer_id: 2,
            answerer_username: 'man',
            answerer_avatar: 'https://moderncat.com/wp-content/uploads/2014/03/tortoiseshell-kitten-closeup-p-46771525-940x640.jpg',
            answerer_content:'hello',
            tags: [{
              tag_id: 1,
              tag_name: '#VOO'
            }],
            created_time: '2022-11-6'
        }
    ]
  }
}