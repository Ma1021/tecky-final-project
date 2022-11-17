import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

export interface Question_Result {
    id: number,
    asker_id: number,
    asker_username: string,
    asker_avatar: string,
    asker_content: string,
    answers:Array<{
      id: number,
      answerer_id: number,
      answerer_username: string,
      answerer_avatar: string,
      answerer_content: string,
      created_at: string,
      like_user_id: Array<number>
    }>
    stocks:
    Array<{
        stock_id: number,
        stock_name: string,
        stock_symbol: string
    }>,
    created_time: string
}


@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})


export class QuestionModule {}