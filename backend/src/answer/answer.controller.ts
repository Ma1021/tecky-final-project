import { Body, Controller, Get, Post, Response, HttpException, HttpStatus, Param, Res } from "@nestjs/common";
import { Answer_DTO } from "./answer.dto";
import { AnswerService } from "./answer.service";

@Controller('/answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async createAnswer(@Body() answer: Answer_DTO, @Response() res) {
        const { answerer_id, question_id, content } = answer;

        if(!answerer_id) {
            throw new HttpException('Missing answerer id', HttpStatus.BAD_REQUEST)
        }
        if(!question_id) {
            throw new HttpException('Missing question id', HttpStatus.BAD_REQUEST)
        }
        if(!content) {
            throw new HttpException('Missing content', HttpStatus.BAD_REQUEST)
        }
        if(typeof answerer_id !== 'number') {
            throw new HttpException('Invalid answerer id', HttpStatus.BAD_REQUEST)
        }
        if(typeof question_id !== 'number') {
            throw new HttpException('Invalid question id', HttpStatus.BAD_REQUEST)
        }

        this.answerService.create(answer).then(()=>{
            res.status(HttpStatus.CREATED).json({message:"Create answer successfully"});
        })
    }
}