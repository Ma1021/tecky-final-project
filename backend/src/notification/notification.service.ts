import { Injectable } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Notification_DTO } from "./notification.dto";

@Injectable()
export class NotificationService {
    constructor(@InjectModel() private readonly knex:Knex) {}

    async create(notification: Notification_DTO) {
        try {
            const { notification_type_id, notification_target_id, actor_id, notifiers } = notification;

            // insert notification object
            const objectRes = await this.knex('notification_object').insert({
                notification_type_id,
                notification_target_id,
                actor_id
            }).returning('id');

            const notification_object_id = objectRes[0].id;
            
            // insert notification
            if(notifiers.length > 1) {
                for(let notifier_id of notifiers) {
                    await this.knex('notification').insert({
                        notification_object_id,
                        notifier_id
                    })
                }
            } else {
                await this.knex('notification').insert({
                    notification_object_id,
                    notifier_id: notifiers
                })
            }
        }catch(err) {
            console.log(err);
        }
    }

    async findAll(user_id: number) {
        try {
            const res = await this.knex.raw(`
                SELECT notification.id, notification.created_at, notification.is_read, notification_object.notification_type_id,
                jsonb_build_object(
                    'id', users.id,
                    'username', users.username,
                    'avatar', users.avatar
                ) as actor,
                (SELECT jsonb_build_object(
                    'question_id', questions.id,
                    'question_content', questions.content
                ) from questions where notification_object.notification_type_id = 1 and questions.id = notification_object.notification_target_id
                UNION
                SELECT jsonb_build_object(
                    'answer_id', answers.id,
                    'answer_content', answers.content
                ) from answers where notification_object.notification_type_id = 2 and answers.id = notification_object.notification_target_id
                ) as target
                from notification
                inner join notification_object on notification.notification_object_id = notification_object.id
                inner join questions on notification_object.notification_target_id = questions.id
                inner join users on users.id = notification_object.actor_id
                where notification.notifier_id = ?
                order by notification.created_at desc
                ;
            `, [user_id])
            return res.rows
        } catch(err) {
            console.log(err);
        }
    }

    async updateRead(notification_id: number) {
        try {
            return this.knex('notification').update({is_read: true}).where('id', notification_id).returning('*');
        } catch(err) {
            console.log(err);
        }
    }
}