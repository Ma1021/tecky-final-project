import { Body, Controller, Post, Response, HttpException, HttpStatus, Param, Get } from "@nestjs/common";
import { Points_DTO } from "./points.dto";
import { PointsService } from "./points.service";

@Controller('/points')
export class PointsController {
    constructor(private readonly pointsService: PointsService) {}

    @Get('/:id')
    async findPointsRecord(@Param('id') user_id: string) {
        if(!user_id) {
            throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST)
        }

        const totalRes = await this.pointsService.findTotal(+user_id);
        let {totalPoints} = totalRes[0]
        if(totalPoints === null) {
            totalPoints = 0
        }
        const records = await this.pointsService.find(+user_id);
        
        return {totalPoints, records}
    }

    @Post()
    createPointsRecord(@Body() record: Points_DTO) {
        return this.pointsService.create(record);
    }  
}