import { Body, Controller, Get, HttpException, HttpStatus, Param, Patch, Post, Put, UnprocessableEntityException } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question_DTO } from './question.module'

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
    
  @Get()
  async getQuestions() {
    const questions = await this.questionService.getQuestions();

    if(questions.length <= 0) {
      throw new HttpException('Questions not found', HttpStatus.NOT_FOUND);
    }

    return questions;
  }

  // get one question by question id
  @Get(':id')
  async getQuestion(@Param('id') question_id:string) {
    const question = await this.questionService.getQuestion(+question_id);

    if(question.length <= 0) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return question;
  }

  // get one or all questions by asker id
  @Get('/user/:id')
  async getAskerQuestions(@Param('id') asker_id: string) {
    if(!asker_id) {
      throw new HttpException('Missing asker id', HttpStatus.BAD_REQUEST)
    }

    const questions = await this.questionService.getAskerQuestions(+asker_id)

    if(questions.length <= 0) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return questions;
  }

  @Post()
  createQuestion(@Body() questions: Question_DTO) {
    const { asker_id, content, stock_id } = questions;

    if(!content) {
      throw new HttpException('Missing content', HttpStatus.BAD_REQUEST)
    } 

    if(!asker_id) {
      throw new HttpException('Missing asker id', HttpStatus.BAD_REQUEST)
    } 

    if(typeof asker_id !== 'number') {
      throw new HttpException('Invalid asker id', HttpStatus.BAD_REQUEST)
    }

    for(let stockId of stock_id) {
      if(typeof stockId !== 'number') {
        throw new HttpException('Invalid tag id', HttpStatus.BAD_REQUEST)
      }
    }

    return this.questionService.createQuestion(questions);
  }

  @Put(':id')
  async updateQuestion(@Param('id') question_id: string,  @Body() questions: Question_DTO) {
    const { asker_id, content, stock_id } = questions;

    if(!content) {
      throw new HttpException('Missing content', HttpStatus.BAD_REQUEST)
    }

    if(!question_id) {
      throw new HttpException('Missing question id', HttpStatus.BAD_REQUEST)
    }

    if(!asker_id) {
      throw new HttpException('Missing asker id', HttpStatus.BAD_REQUEST)
    } 

    if(typeof asker_id !== 'number') {
      throw new HttpException('Invalid asker id', HttpStatus.BAD_REQUEST)
    }

    for(let stockId of stock_id) {
      if(typeof stockId !== 'number') {
        throw new HttpException('Invalid tag id', HttpStatus.BAD_REQUEST)
      }
    }

    //checking the question is exist or not
    const question = await this.questionService.getQuestion(+question_id);

    if(question.length <= 0) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    return this.questionService.updateQuestion(+question_id, questions);
  }
} 