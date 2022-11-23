import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './stock.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/getMyList')
  async getMyList(@Query('userID') userID: string) {
    return await this.appService.getMyList(userID);
  }

  @Get('/getAllDataFromStockInfo')
  async getAllDataFromStockInfo(@Query('symbol') stockSymbol: string) {
    return await this.appService.getAllDataFromStockInfo(stockSymbol);
  }

  @Get('/getSomeDataFromStockInfo')
  async getSomeDataFromStockInfo(@Query('id') stockID: string) {
    return await this.appService.getSomeDataFromStockInfo(stockID);
  }

  @Get('/getDataFromIntraDay')
  async getDataFromIntraDay(@Query('id') stockID: string) {
    return await this.appService.getDataFromIntraDay(stockID);
  }

  @Get('/getIntraDayDataFromMongoDB')
  async getIntraDayDataFromMongoDB(@Query('symbol') symbol: string) {
    return await this.appService.getIntraDayDataFromMongoDB(symbol);
  }
  @Get('/getDataFromMongoDB')
  async getDataFromMongoDB(@Query('symbol') symbol: string) {
    return await this.appService.getDataFromMongoDB(symbol);
  }

  @Get('/getEveryDayDataFromMongoDB')
  async getEveryDayDataFromMongoDB(@Query('symbol') symbol: string) {
    return await this.appService.getEveryDayDataFromMongoDB(symbol);
  }
}
