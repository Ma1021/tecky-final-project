import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";


@Injectable()
export class AnalyticsService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async findMonth(user_id: number) {
        try {
            


        } catch(err) {
            console.log(err);
        } 
    }
    
}