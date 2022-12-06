import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";

@Injectable()
export class ReportService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    findWaiting() {
        try {
            return this.knex('reports')
            .select('reports.*', 'users.username as to_user_username', 'users.avatar as to_user_avatar', 'users.user_type as to_user_type')
            .where('is_confirmed', false)
            .innerJoin('users', 'reports.to_user_id', 'users.id')
            .orderBy('reports.created_at', 'desc');
        } catch(err) {
            console.log('find all report:', err);
        }
    }

    findConfirmed() {
        try {
            return this.knex('reports')
            .select('reports.*', 'users.username as to_user_username', 'users.avatar as to_user_avatar', 'users.user_type as to_user_type')
            .where('is_confirmed', true)
            .innerJoin('users', 'reports.from_user_id', 'users.id')
            .orderBy('reports.updated_at', 'desc');
        } catch(err) {
            console.log('find all confirmed report', err);
        }
    }
}