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

  @Get('/getMinuteDataFromMongoAPI')
  async getMinuteDataFromMongoAPI(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.stockService.getMinuteDataFromMongoAPI(symbol, timeFrame);
  }

  @Get('/getDayDataFromMongoAPI')
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

  @Get('/getCryptoDataFromMongoAPI')
  async getCryptoDataFromMongoAPI(
    @Query('symbol') symbol: string,
    @Query('timeFrame') timeFrame: string,
  ) {
    return await this.stockService.getCryptoDataFromMongoAPI(symbol, timeFrame);
  }

  @Get('/getHighLowFromMongoAPI')
  async getHighLowFromMongoAPI(@Query('symbol') symbol: string) {
    return await this.stockService.getHighLowFromMongoAPI(symbol);
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
