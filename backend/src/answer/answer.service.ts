import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Answer_DTO } from './answer.dto'

interface Answer_Result {
    id: number,
    answerer_id: number,
    answerer_username: string,
    answerer_avatar: string,
    answerer_content: string,
    created_at: string,
    like_user_id: Array<number>
}

@Injectable()
export class AnswerService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async create(answer: Answer_DTO) {
        try {
            const { answerer_id, question_id, content } = answer;

            const res = await this.knex('answers').insert({answerer_id, question_id, content}).returning('id');
        
            return res[0];
        } catch(err) {
            console.log(err);
        }
    }
}