import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

export interface Question_Result {
    id: number,
    asker_id: number,
    asker_username: string,
    asker_avatar: string,
    asker_content: string,
    answerer_id: number,
    answerer_username: string,
    answerer_avatar: string,
    answerer_content: string,
    stocks:
    Array<{
        stock_id: number,
        stock_name: string,
        stock_symbol: string
    }>,
    created_time: string
}

export interface Question_DTO {
  asker_id: number,
  content: string,
  stock_id?:Array<number>
  tag_id?:number
}

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
})


export class QuestionModule {}