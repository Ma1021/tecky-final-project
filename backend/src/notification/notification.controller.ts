import { Body, Controller, Post, HttpStatus, Response, Get, Param, HttpException, Put, Delete } from "@nestjs/common";
import { Notification_DTO, Notification_Delete_DTO, Push_Token_DTO} from "./notification.dto";
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

    @Post()
    async createNotification(@Body() notification: Notification_DTO, @Response() res) {
        const response = await this.notificationService.create(notification);
        
        if(response.length > 0) {
            res.status(HttpStatus.ACCEPTED).json({message:"notification create successfully"});

            // push notification for create question
            if(notification.notification_type_id === 1) {

                // get notifier push notification key
                fetch(`https://fcm.googleapis.com/fcm/send`, {
                    method:"POST",
                    headers:{"content-type": "application/json", "Authorization":`key=${env.FIREBASE_KEY}`},
                    body:JSON.stringify({
                        registration_ids:["fGj535iGRv6mdtT_pKdwn3:APA91bE85KV1ythCy7weHJUI2tSoGvJi2GCxNbnodtT5DmbryWFA9vVERa4m-dGSjTh0Q074rKtU-bOJ4qtEKgGxKdYMbco_e8q7wVhdyVxe_IS8VzoUf1K-2wjXdc7JP3bANbQYE9pM", "c38Vo1gbzUhfng7_2jI-t2:APA91bF_tnBOX8VBJDuBYUY5TcJHUgH4IjWh3_SJ9ZZ5VQgxVImhYqRflVQnxPRI3_0XCoVqgYgnmu4K1UF9nfdXq9KBZhFD0iS0q0u9moKoGC8oP-F4lV577aLeZM2yk9pN3X5YOJSd"],
                        content_available : true,
                        priority:"high",
                        notification : {
                            title: notification.actor_username + " 提出了問題",
                            body : notification.content
                        }
                    })
                }).then(()=>{
                    console.log('message sent');
                })
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

    // delete one notification
    @Delete()
    async deleteOne (@Body() notification: Notification_Delete_DTO, @Response() res) {
        const response = await this.notificationService.deleteNotification(notification);
        if(response <= 0) {
            res.status(HttpStatus.NOT_FOUND).json({message:"notification not found"});
        }
        return response;
    }

    // delete all notification by user id
    @Delete('/user/:id')
    async deleteAll(@Param('id') user_id: string, @Response() res) {        
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
        }

        const response = await this.notificationService.deleteAllNotification(+user_id);
        
        if(response.length === 0) {
            res.status(HttpStatus.CONFLICT).json({message:"inbox is empty, nothing can be delete"});
        }

        return response;
    }
}