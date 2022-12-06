import { Controller, Get } from "@nestjs/common";
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
}