import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Answer_DTO, Answer_Like_DTO } from './answer.dto'

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

    async createLike(like: Answer_Like_DTO) {
        try {
            return this.knex('ans_likes').select('*')
            .where('user_id', like.user_id)
            .andWhere('answer_id', like.answer_id)
            .then(async likeList => {
                if(likeList.length > 0) {
                    return await this.knex('ans_likes').where('user_id', like.user_id).andWhere('answer_id', like.answer_id).del().returning('id')
                } else {
                    return await this.knex('ans_likes').insert(like).returning('id');
                }
            })
        } catch(err) {  
            console.log(err);
        }
    }
    
}