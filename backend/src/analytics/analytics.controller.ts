import { AnalyticsService } from "./analytics.service";
import { Body, Controller, Post, Response, HttpException, HttpStatus, Param, Delete, Get } from "@nestjs/common";

@Controller('/analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) {}

    @Get('/follower_month/:id')
    async findFollowerMonth(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST)
        }
        return await this.analyticsService.findMonth(+user_id);
    }

    @Get('/follower_gender/:id')
    async findFollowerGender(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST)
        }
        return await this.analyticsService.findGender(+user_id);
    }

    @Get('/follower_age/:id')
    async findFollowerAge(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST)
        }
        return await this.analyticsService.findAge(+user_id);
    }
}