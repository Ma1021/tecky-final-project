import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question_Result } from './question.module'

interface Question_Post {
    user_id: number,
    content: string,
    tags?:Array<number>
}

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
    
  @Get()
  getQuestions(): Array<Question_Result> {
    return this.questionService.getQuestions();
  }

  @Post()
  createQuestion(@Body() { user_id, content, tags }): string {
    return ''
  }
} 