import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PlaceOrderDTO } from './paperTrade.dto';
import { PaperTradeService } from './paperTrade.service';

@Controller('/paperTrade')
export class PaperTradeController {
  constructor(private readonly paperTradeService: PaperTradeService) {}

  @Post('/placeOrder')
  async placeOrder(@Body() order: PlaceOrderDTO) {
    console.log('controller body:', order);

    const { userID, stockID, orderType, price, quantity } = order;

    return await this.paperTradeService.placeOrder(
      userID,
      stockID,
      orderType,
      price,
      quantity,
    );
  }

  @Get('/getInProgressOrderList')
  async getInProgressOrderList(
    @Query('userID') userID: string,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getInProgressOrderList(userID, account);
  }

  @Get('/getFullOrderList')
  async getFullOrderList(
    @Query('userID') userID: string,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getFullOrderList(userID, account);
  }
}
