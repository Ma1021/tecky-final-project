import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { StockService } from './stock.service';
// import {
//   ClientKafka,
//   MessagePattern,
//   Payload,
//   Ctx,
//   KafkaContext,
// } from '@nestjs/microservices';

@Controller('/stock')
export class StockController {
  constructor(
    private readonly stockService: StockService, // @Inject('stock-overflow') private readonly client: ClientKafka,
  ) {}

  @Get('/getUserList')
  async getUserList(@Query('userID') userID: string) {
    return await this.stockService.getUserList(userID);
  }

  @Get('/getAllDataFromStockInfo')
  async getAllDataFromStockInfo(@Query('symbol') stockSymbol: string) {
    return await this.stockService.getAllDataFromStockInfo(stockSymbol);
  }

  @Get('/getIntraDayDataFromMongoDB')
  async getIntraDayDataFromMongoDB(@Query('symbol') symbol: string) {
    return await this.stockService.getIntraDayDataFromMongoDB(symbol);
  }
  @Get('/getMinuteDataFromMongoDB')
  async getMinuteDataFromMongoDB(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.stockService.getMinuteDataFromMongoDB(symbol, timeFrame);
  }

  // @Get('/getDayDataFromMongoDB')
  // async getDayDataFromMongoDB(
  //   @Query('symbol') symbol: string,
  //   @Query('timeFrame') timeFrame: string,
  // ) {
  //   return await this.appService.getDayDataFromMongoDB(symbol, timeFrame);
  // }

  @Get('/getDayDataFromMongoDB')
  async getDayDataFromMongoAPI(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.stockService.getDayDataFromMongoAPI(symbol, timeFrame);
  }

  @Get('/getNewsFromPostgres')
  async getNewsFromPostgres(@Query('symbol') symbol: string) {
    return await this.stockService.getNewsFromPostgres(symbol);
  }

  @Get('/getUserTradeRecords')
  async getUserTradeRecordsFromPostgres(@Query('userID') userID: string) {
    return await this.stockService.getUserTradeRecordsFromPostgres(userID);
  }

  @Post('/subscribeStock')
  async subscribeStock(@Body() order: { userID: number; symbol: string }) {
    const { userID, symbol } = order;
    return await this.stockService.subscribeStock(userID, symbol);
  }

  @Get('/checkSubscription')
  async checkSubscription(
    @Query('userID') userID: number,
    @Query('symbol') symbol: string,
  ) {
    return await this.stockService.checkUserStockSubscription(userID, symbol);
  }

  // @Get('kafka-test')
  // testKafka() {
  //   return this.client.emit('medium.rocks', {
  //     foo: 'bar',
  //     data: new Date().toString(),
  //   });
  // }

  // @MessagePattern('medium.rocks')
  // readMessage(@Payload() message: any, @Ctx() context: KafkaContext) {
  //   const originalMessage = context.getMessage();
  //   const response =
  //     `Receiving a new message from topic: medium.rocks: ` +
  //     JSON.stringify(originalMessage.value);
  //   console.log(response);
  //   return response;
  // }
}
