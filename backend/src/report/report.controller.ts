import { Body, Controller, Get, Put, HttpException, HttpStatus } from "@nestjs/common";
import { ReportService } from "./report.service";

@Controller('/report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get()
    async findReportList() {
        const waitingRes = await this.reportService.findWaiting();
        const confirmedRes = await this.reportService.findConfirmed();
        return {waitingReports:waitingRes, confirmedReports:confirmedRes};
    }

    @Put()
    acceptReport(@Body() body) {
        if(body.report_ids.length === 0) {
            throw new HttpException('Missing report id', HttpStatus.BAD_REQUEST);
        }

        return this.reportService.confirmed(body);
    }
}