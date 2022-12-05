import { Body, Controller, Post, HttpStatus, Response, Get, Param, HttpException, Put, Delete } from "@nestjs/common";
import { Notification_DTO, Notification_Delete_DTO, Push_Token_DTO, Push_Notification_DTO} from "./notification.dto";
import { NotificationService } from "./notification.service";
import {env} from '../../env';
import fetch from 'node-fetch';

@Controller('/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}
    
    // check and update token
    @Post('/push_token') 
    checkPushToken(@Body() auth:Push_Token_DTO) {
      return this.notificationService.checkToken(auth);
    }

    @Delete('/push_token/:id')
    deletePushToken(@Param('id') user_id: string) {
        return this.notificationService.deleteToken(+user_id);
    }

    @Post()
    async createNotification(@Body() notification: Notification_DTO, @Response() res) {
        const response = await this.notificationService.create(notification);
        
        if(response.length > 0) {
            res.status(HttpStatus.ACCEPTED).json({message:"notification create successfully"});
        }
    }

    @Get('/push_token/:id')
    getFollowerToken(@Param('id') user_id: string) {        
        return this.notificationService.getFollowerToken(+user_id);
    }

    @Post('/push_notification')
    async pushNotification(@Body() push_notification: Push_Notification_DTO) {          
        if(push_notification.notifiers.length === 0) {
            return
        }
        
        //push notification type
        // 1 = question
        // 2 = answer
        // 3 = follow

        // push notification for create question
        if(push_notification.notification_type_id === 1) {
            fetch(`https://fcm.googleapis.com/fcm/send`, {
                method:"POST",
                headers:{"content-type": "application/json", "Authorization":`key=${env.FIREBASE_KEY}`},
                body:JSON.stringify({
                    registration_ids:push_notification.notifiers,
                    content_available : true,
                    priority:"high",
                    notification : {
                        title: push_notification.actor_username + " 提出了問題",
                        body : push_notification.content,
                        sound: "default"
                    }
                })
            })
        } else if (push_notification.notification_type_id === 2) {
            // get notifier push token
            const notifier_push_token =  await this.getFollowerToken(push_notification.notifiers[0])

            if(notifier_push_token.length > 0) {
                fetch(`https://fcm.googleapis.com/fcm/send`, {
                    method:"POST",
                    headers:{"content-type": "application/json", "Authorization":`key=${env.FIREBASE_KEY}`},
                    body:JSON.stringify({
                        registration_ids:notifier_push_token,
                        content_available : true,
                        priority:"high",
                        notification : {
                            title: push_notification.actor_username + " 回答了你的問題",
                            body : push_notification.content,
                            sound: "default"
                        }
                    })
                })
            } else {
                throw new HttpException('Missing user push token', HttpStatus.BAD_REQUEST);
            }

        } else if(push_notification.notification_type_id === 3) {
            // get notifier push token
            const notifier_push_token =  await this.getFollowerToken(push_notification.notifiers[0])

            if(notifier_push_token.length > 0) {
                fetch(`https://fcm.googleapis.com/fcm/send`, {
                    method:"POST",
                    headers:{"content-type": "application/json", "Authorization":`key=${env.FIREBASE_KEY}`},
                    body:JSON.stringify({
                        registration_ids:notifier_push_token,
                        content_available : true,
                        priority:"high",
                        notification : {
                            title: push_notification.actor_username + " 關注了你",
                            sound: "default"
                        }
                    })
                })
            } else {
                throw new HttpException('Missing user push token', HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Get(':id')
    findAllNotification(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
        }

        return this.notificationService.findAll(+user_id);
    }

    @Put(':id')
    async readNotification(@Param('id') notification_id: string, @Response() res) {
        if(!notification_id) {
            throw new HttpException('Missing notification id', HttpStatus.BAD_REQUEST);
        }
        const response = await this.notificationService.updateRead(+notification_id);
        if(response.length > 0) {
            res.status(HttpStatus.ACCEPTED).json({message:"notification update successfully"});
        }
    }

    @Put('/readAll/:id')
    readAllNotification(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
        }
        return this.notificationService.updateAllRead(+user_id);
    }

    // delete one notification
    @Delete()
    async deleteOne (@Body() notification: Notification_Delete_DTO) {
        return await this.notificationService.deleteNotification(notification);
    }

    // delete all notification by user id
    @Delete('/user/:id')
    async deleteAll(@Param('id') user_id: string, @Response() res) {        
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
        }

        const response = await this.notificationService.deleteAllNotification(+user_id);
        
        console.log(response);

        if(response <= 0) {
            res.status(HttpStatus.CONFLICT).json({message:"inbox is empty, nothing can be delete"});
        }

        return response;
    }
}