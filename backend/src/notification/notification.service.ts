import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from 'nest-knexjs';
import { Knex } from "knex";
import { Notification_DTO, Notification_Delete_DTO, Push_Token_DTO } from "./notification.dto";

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

            return objectRes;
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
                CASE notification_object.notification_type_id
                WHEN 1 THEN 
                (SELECT jsonb_build_object(
                    'question_id', questions.id,
                    'question_content', questions.content
                ) from questions where questions.id = notification_object.notification_target_id)
                WHEN 2 THEN
                (SELECT jsonb_build_object(
                    'question_id', answers.question_id,
                    'answer_id', answers.id,
                    'answer_content', answers.content
                ) from answers where answers.id = notification_object.notification_target_id)
                WHEN 3 THEN
                (SELECT jsonb_build_object(
                    'subscription_id', subscriptions.id,
                    'following_id', subscriptions.following_id
                ) from subscriptions where subscriptions.id = notification_object.notification_target_id)
                END target
                from notification
                inner join notification_object on notification.notification_object_id = notification_object.id
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
            return await this.knex('notification').update({is_read: true}).where('id', notification_id).returning('*');
        } catch(err) {
            console.log(err);
        }
    }

    async deleteNotification(notification:Notification_Delete_DTO) {
        try {
            const { target_id, target_type_id } = notification
                        
            // delete notification
            const objectRes = await this.knex('notification_object').select('id').where('notification_target_id', target_id).andWhere('notification_type_id', target_type_id);            
                                    
            for(let object of objectRes) {
                await this.knex('notification').where('notification_object_id', object.id).del();
            }

            // delete notification_object
            return await this.knex('notification_object').where('notification_target_id', target_id).del();

        } catch(err) {
            console.log(err);
        }
    }

    async deleteAllNotification(user_id: number) {
        try {
            // get all object id and delete notification   
            const objectRes = await this.knex('notification').where('notifier_id', user_id).del().returning('notification_object_id');
            
            //delete notification object
            if(objectRes.length > 0) {
                for(let object of objectRes) {
                    await this.knex('notification_object').where('id', object.notification_object_id).del();
                }
            }

            return objectRes;
        } catch(err) {
            console.log(err);
        }
    }

    // push notification start
    async checkToken(auth:Push_Token_DTO) {
        try {
            // check the token is same to old token or not
            this.knex('users')
            .select('push_notification_token', 'id')
            .where('push_notification_token', auth.token)
            .andWhere('id', auth.user_id)
            .andWhere('is_deleted', false)
            .then((response)=>{                
                // if no token or is not same then update the token to table
                if(response.length === 0) {
                    console.log('update token');
                    return this.knex('users')
                    .update({push_notification_token:auth.token})
                    .where('id', auth.user_id)
                    .andWhere('is_deleted', false)
                    .returning('*');
                } else if(response[0].push_notification_token === auth.token) {
                    // if the token is same then do nothing
                    console.log('do nothing');
                    return
                }
            }).catch((err)=>{
                return err                
            });
        } catch(err) {
            console.log(err);
        }
    }

    async getFollowerToken(user_id: number) {
        const tokenRes = await this.knex('users')
        .select(
            'users.push_notification_token'
        )
        .where('id', user_id)

        const token = tokenRes[0].push_notification_token

        return [token]
    }
}