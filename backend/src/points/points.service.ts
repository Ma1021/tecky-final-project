import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Points_DTO } from "./points.dto";

@Injectable()
export class PointsService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    find(user_id: number) {
        try {
            return this.knex('user_points').select('*').where('user_id', user_id);
        } catch(err) {
            console.log('find point record:', err);
        }
    }

    findTotal(user_id: number) {
        try {
            return this.knex('user_points').sum('point as totalPoints').where('user_id', user_id);
        } catch(err) {
            console.log('find total point:', err);
        }
    }

    create(record: Points_DTO) {
        try {    
            switch (record.event) {
                case '提出問題':
                    record.point = 10;
                    return this.knex('user_points').insert(record);
                case '回答問題':
                    record.point = 5;
                    return this.knex('user_points').insert(record);                    
                case '被舉報':
                    record.point = -20;
                    return this.knex('user_points').insert(record);                    
                default:
                    break;
            }
        } catch(err) {
            console.log('create point record', err);
        }
    }
}