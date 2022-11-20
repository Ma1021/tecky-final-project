import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Answer_DTO } from './answer.dto'

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

    async delete(answer_id: number) {
        try {
            return await this.knex('answers').where('id', answer_id).del();
        } catch(err) {
            console.log(err);
        }
    }
}