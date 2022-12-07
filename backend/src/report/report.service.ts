import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";

@Injectable()
export class ReportService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    findWaiting() {
        try {
            const tables = ['answers', 'questions']
            for(let table of tables) {
                return this.knex('reports')
                .select('reports.*', 'users.username as to_user_username', 'users.avatar as to_user_avatar', 'users.user_type as to_user_type', `${table}.content`)
                .where('is_confirmed', false)
                .innerJoin('users', 'reports.to_user_id', 'users.id')
                .innerJoin(`${table}`, `${table}.id`, `reports.target_id`)
                .orderBy('reports.created_at', 'desc');
            }            
        } catch(err) {
            console.log('find all report:', err);
        }
    }

    findConfirmed() {
        try {
            const tables = ['answers', 'questions']

            for(let table of tables) {
                return this.knex('reports')
                .select('reports.*', 'users.username as to_user_username', 'users.avatar as to_user_avatar', 'users.user_type as to_user_type', `${table}.content`)
                .where('is_confirmed', true)
                .innerJoin('users', 'reports.to_user_id', 'users.id')
                .innerJoin(`${table}`, `${table}.id`, `reports.target_id`)
                .orderBy('reports.updated_at', 'desc');
            }
        } catch(err) {
            console.log('find all confirmed report', err);
        }
    }

    async confirmed(body) {
        try {
            const ids = body.report_ids
            const records = [];
            const tables = ['answers', 'questions']

            // update reports  table
            for(let id of ids) {
                const res =  await this.knex('reports').update({'is_confirmed':true}).where('id', id).returning('*');
                records.push(res[0]);
            }
            
            for(let record of records) {
                const obj = {
                    user_id: record.to_user_id,
                    event: '被舉報',
                    event_id: record.target_id,
                    point: -20
                }

                // insert record point
                await this.knex('user_points').insert(obj);
                
                // update target is_ban
                for(let table of tables) {
                    await this.knex(`${table}`).update({'is_ban': true}).where('id', record.target_id)
                }
            }           
        } catch(err) {
            console.log('update report:', err);
        }
    }
}