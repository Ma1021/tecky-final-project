import { AnalyticsService } from "./analytics.service";
import { Body, Controller, Post, Response, HttpException, HttpStatus, Param, Delete, Get } from "@nestjs/common";

@Controller('/analytics')
export class AnalyticsController {
    @Get(':id')
    findFollowerMonth(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST)
        }
        
        
    }
}