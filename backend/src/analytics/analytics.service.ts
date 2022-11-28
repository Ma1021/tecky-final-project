import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";


@Injectable()
export class AnalyticsService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async findMonth(user_id: number) {
        try {
            // 30days follower per day amount
            const dataRes = await this.knex.raw(`
            SELECT
            DATE_TRUNC('day','created_at') as "date",
            COUNT("created_at")::INT as number_of_follower
            FROM "subscriptions"
            WHERE subscriptions.following_id = ?
            AND subscriptions.is_deleted = false
            AND subscriptions.created_at > now() - interval '30 day'
            GROUP BY DATE_TRUNC('day', "created_at")
            ORDER BY date desc;
            `,[user_id])            

            // total follower for now
            const nowRes = await this.knex('subscriptions')
            .count('user_id as number_of_follower')
            .where('following_id', user_id)
            .andWhere('is_deleted', false)

            // total follower for before 30 days
            const beforeMonthRes = await this.knex('subscriptions')
            .count('user_id as number_of_follower')
            .where('following_id', user_id)
            .andWhere('is_deleted', false)
            .andWhere(this.knex.raw(`created_at < now() - interval '30 day'`))

            return [{
                follower_now:+nowRes[0].number_of_follower,
                follower_beforeMonth:+beforeMonthRes[0].number_of_follower,
                data: dataRes.rows
            }]

        } catch(err) {
            console.log(err);
        } 
    }
}