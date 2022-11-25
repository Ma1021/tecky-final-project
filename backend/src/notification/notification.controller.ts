import { Body, Controller, Post, HttpStatus, Response, Get, Param, HttpException, Put, Delete } from "@nestjs/common";
import { Notification_DTO, Notification_Delete_DTO } from "./notification.dto";
import { NotificationService } from "./notification.service";

@Controller('/notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @Post()
    createNotification(@Body() notification: Notification_DTO, @Response() res) {
        this.notificationService.create(notification).then(()=>{
            res.status(HttpStatus.ACCEPTED).json({message:"notification create successfully"});
        });
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