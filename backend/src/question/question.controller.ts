import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Response } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question_DTO, Report_DTO } from './question.dto'
import { query } from 'express';

@Controller('/question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
    
  @Get()
  async getQuestions() {
    return await this.questionService.findAll();
  }

  // get one question by question id
  @Get(':id')
  async getQuestion(@Param('id') question_id:string) {
    return await this.questionService.findOne(+question_id);
  }

  // get one or all questions by asker id
  @Get('/user/:id')
  async getAskerQuestions(@Param('id') asker_id: string) {
    if(!asker_id) {
      throw new HttpException('Missing asker id', HttpStatus.BAD_REQUEST)
    }
    return await this.questionService.findAskerQuestions(+asker_id);
  }

  // get one or all questions by answerer id
  @Get('/answerer/:id')
  async getAnswererQuestions(@Param('id') answerer_id: string) {
    if(!answerer_id) {
      throw new HttpException('Missing answerer id', HttpStatus.BAD_REQUEST)
    }

    return await this.questionService.findAnswererQuestions(+answerer_id);
  }

  // get all questions by stock symbol
  @Get('/stock/symbol?')
  getQuestionBySymbol(@Query() query) {
    if(!query.symbol) {
      throw new HttpException('Missing stock symbol', HttpStatus.BAD_REQUEST)
    }

    return this.questionService.findQuestionBySymbol(query.symbol.toUpperCase());
  }

  // get stock symbol
  @Get('/symbol/stock') 
  getStockSymbol() {    
    return this.questionService.symbol();
  }
  

  @Post()
  createQuestion(@Body() questions: Question_DTO, @Response() res) {    
    return this.questionService.create(questions).then(async (response)=>{
      const { id } = response[0]
      if(id) {
        const question = await this.questionService.findOne(+id)      
        if(question.length === 0) {
          throw new HttpException('error', HttpStatus.BAD_REQUEST)
        }
        res.status(HttpStatus.CREATED).json(question)
      }
    })
  }

  @Post('/report')
  reportQuestion(@Body() report:Report_DTO ) {
    return this.questionService.report(report);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') question_id: string, @Response() res) {
    if(!question_id) {
      throw new HttpException('Missing question id', HttpStatus.BAD_REQUEST)
    }

    //checking the question is exist or not
    const question = await this.questionService.findOne(+question_id);
    
    if(question.length <= 0) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }

    this.questionService.delete(+question_id).then(()=>{
      res.status(HttpStatus.ACCEPTED).json({message:"Delete question successfully", question_id})
    })   
  }
} 