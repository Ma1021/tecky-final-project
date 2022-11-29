import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";

@Injectable()
export class AnalyticsService {
    constructor(@InjectModel() private readonly knex: Knex) {}

    async findMonth(user_id: number) {
        try {
            const data = [];
            // 30days follower increase per day
            const i_dataRes = await this.knex.raw(`
            SELECT
            category,
            DATE_TRUNC('day', created_at) as date,
            COUNT("created_at")::INT as number_of_follower
            FROM "subscriptions"
            WHERE subscriptions.following_id = ?
            AND subscriptions.is_deleted = false
            AND subscriptions.created_at > now() - interval '30 day'
            GROUP BY DATE_TRUNC('day', created_at), category
            ORDER BY date asc;
            `,[user_id])

            i_dataRes.rows.map((i_data)=>{
                data.push({
                    date: i_data.date.toISOString().split('T')[0],
                    number_of_follower: i_data.number_of_follower,
                    category:i_data.category
                });
            })
            
            // 30days follower decrease per day
            const d_dataRes = await this.knex.raw(`
            SELECT
            category,
            DATE_TRUNC('day', created_at) as date,
            COUNT("created_at")::INT as number_of_follower
            FROM "subscriptions"
            WHERE subscriptions.following_id = ?
            AND subscriptions.is_deleted = true
            AND subscriptions.created_at > now() - interval '30 day'
            GROUP BY DATE_TRUNC('day', created_at), category
            ORDER BY date asc;
            `, [user_id])
            
            d_dataRes.rows.map((i_data)=>{
                data.push({
                    date: i_data.date.toISOString().split('T')[0],
                    number_of_follower: i_data.number_of_follower,
                    category:i_data.category
                });
            })

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

            // number of increase within 30days
            const increaseNum = await this.knex('subscriptions')
            .count('user_id as number_of_follower')
            .where('following_id', user_id)
            .andWhere('is_deleted', false)
            .andWhere(this.knex.raw(`created_at > now() - interval '30 day'`))

            // number of decrease within 30days
            const decreaseNum = await this.knex('subscriptions')
            .count('user_id as number_of_follower')
            .where('following_id', user_id)
            .andWhere('is_deleted', true)
            .andWhere(this.knex.raw(`created_at > now() - interval '30 day'`))

            return [{
                follower_now:+nowRes[0].number_of_follower,
                follower_beforeMonth:+beforeMonthRes[0].number_of_follower,
                increaseNum: +increaseNum[0].number_of_follower,
                decreaseNum: +decreaseNum[0].number_of_follower,
                data
            }]

        } catch(err) {
            console.log(err);
        } 
    }

    async findGender(user_id: number) {
        try {
            const femaleRes = await this.knex('subscriptions')
            .count('users.gender as Female')
            .where('subscriptions.following_id', user_id)
            .where('users.gender', 'F')
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id')

            const maleRes = await this.knex('subscriptions')
            .count('users.gender as Male')
            .where('subscriptions.following_id', user_id)
            .where('users.gender', 'M')
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id')
            
            return [
                {
                    name: "女性",
                    percent: +femaleRes[0].Female,
                    a:'1'
                },
                {
                    name: "男性",
                    percent: +maleRes[0].Male,
                    a:'1'
                }
            ];
        } catch(err) {
            console.log(err);
        }
    }

    async findAge(user_id: number) {
        try {
            function subtractYears(date, years) {
                date.setFullYear(date.getFullYear() - years);
                return date.toISOString().split('T')[0];
            }
            const date = new Date();

            //18-27
            const aRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<=', subtractYears(date, 18))
            .andWhere('users.birthday', '>=', subtractYears(date, 10))
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');
            
            //28-37
            const bRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<=', date.toISOString().split('T')[0])
            .andWhere('users.birthday', '>=', subtractYears(date, 10))
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');
            
            //38-47
            const cRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<=', date.toISOString().split('T')[0])
            .andWhere('users.birthday', '>=', subtractYears(date, 10))
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

            //48-57
            const dRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<=', date.toISOString().split('T')[0])
            .andWhere('users.birthday', '>=', subtractYears(date, 10))
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

            //58-67
            const eRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<=', date.toISOString().split('T')[0])
            .andWhere('users.birthday', '>=', subtractYears(date, 10))
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

            // 68以上
            const fRes = await this.knex('subscriptions')
            .count('users.birthday as amount')
            .where('subscriptions.following_id', user_id)
            .andWhere('users.birthday', '<', date.toISOString().split('T')[0])
            .andWhere('subscriptions.is_deleted', false)
            .innerJoin('users', 'users.id', 'subscriptions.user_id');

            return [
                {
                    "range":"18-27",
                    "amount":+aRes[0].amount
                },
                {
                    "range":"28-37",
                    "amount":+bRes[0].amount
                },
                {
                    "range":"38-47",
                    "amount":+cRes[0].amount
                },
                {
                    "range":"48-57",
                    "amount":+dRes[0].amount
                },
                {
                    "range":"58-67",
                    "amount":+eRes[0].amount
                },{
                    "range":"68+",
                    "amount":+fRes[0].amount
                }
            ]
        } catch(err) {
            console.log(err);
        }
    }
}