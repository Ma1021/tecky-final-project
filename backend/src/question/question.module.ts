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
    tags:
    Array<{
        tag_id: number,
        tag_name: string
    }>,
    created_time: string
}

@Module({
  imports: [],
  controllers: [QuestionController],
  providers: [QuestionService],
})

export class QuestionModule {}