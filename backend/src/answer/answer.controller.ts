import { Body, Controller, Post, Response, HttpException, HttpStatus, Param, Delete, Put } from "@nestjs/common";
import { Answer_DTO, Answer_Like_DTO } from "./answer.dto";
import { AnswerService } from "./answer.service";

@Controller('/answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async createAnswer(@Body() answer: Answer_DTO, @Response() res) {        
        const response = await this.answerService.create(answer)
        const id = response.id

        res.status(HttpStatus.CREATED).json({message:"Create answer successfully", answer_id: id});
    }

    @Delete(':id')
    async deleteAnswer(@Param('id') answer_id: string, @Response() res) {
        if(!answer_id) {
            throw new HttpException('Missing answer id', HttpStatus.BAD_REQUEST)
        }
        
        this.answerService.delete(+answer_id).then(()=>{
            res.status(HttpStatus.ACCEPTED).json({message:"Delete answer successfully"});
        })
    }

    @Post('/like')
    likeAnswer(@Body() like:Answer_Like_DTO) {
        return this.answerService.createLike(like);
    }

    @Put('/report/:id')
    reportAnswer(@Param('id') answer_id: string) {
        return this.answerService.report(+answer_id)
    }
}