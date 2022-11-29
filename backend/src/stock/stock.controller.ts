import { Controller, Get, Post, Query } from '@nestjs/common';
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
    private readonly appService: StockService, // @Inject('stock-overflow') private readonly client: ClientKafka,
  ) {}

  @Get('/getUserList')
  async getUserList(@Query('userID') userID: string) {
    return await this.appService.getUserList(userID);
  }

  @Get('/getAllDataFromStockInfo')
  async getAllDataFromStockInfo(@Query('symbol') stockSymbol: string) {
    return await this.appService.getAllDataFromStockInfo(stockSymbol);
  }

  @Get('/getIntraDayDataFromMongoDB')
  async getIntraDayDataFromMongoDB(@Query('symbol') symbol: string) {
    return await this.appService.getIntraDayDataFromMongoDB(symbol);
  }
  @Get('/getMinuteDataFromMongoDB')
  async getMinuteDataFromMongoDB(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.appService.getMinuteDataFromMongoDB(symbol, timeFrame);
  }

  @Get('/getDayDataFromMongoDB')
  async getDayDataFromMongoDB(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.appService.getDayDataFromMongoDB(symbol, timeFrame);
  }

  @Get('/getNewsFromDB')
  async getNewsFromDB(@Query('symbol') symbol: string) {
    return await this.appService.getNewsFromDB(symbol);
  }

  @Get('/getUserTradeRecords')
  async getUserTradeRecordsFromPostgres(@Query('userID') userID: string) {
    return await this.appService.getUserTradeRecordsFromPostgres(userID);
  }

  @Post('/placeOrder')
  async placeOrder(
    @Query('userID') userID: string,
    @Query('symbol') symbol: string,
    @Query('orderType') orderType: string,
    @Query('price') price: string,
    @Query('quantity') quantity: string,
  ) {
    return await this.appService.placeOrder(
      userID,
      symbol,
      orderType,
      price,
      quantity,
    );
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
