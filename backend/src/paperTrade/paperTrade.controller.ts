import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { CloseOrderDTO, PlaceOrderDTO } from './paperTrade.dto';
import { PaperTradeService } from './paperTrade.service';

@Controller('/paperTrade')
export class PaperTradeController {
  constructor(private readonly paperTradeService: PaperTradeService) {}

  @Post('/placeOrder')
  async placeOrder(@Body() order: PlaceOrderDTO) {
    const { userID, symbol, orderType, price, quantity, account } = order;

    return await this.paperTradeService.placeOrder(
      userID,
      symbol,
      orderType,
      price,
      quantity,
      account,
    );
  }

  @Post('/closePosition')
  async closePosition(@Body() order: CloseOrderDTO) {
    console.log(order);

    const { id, userID, symbol, isLong, price, quantity, account } = order;
    return await this.paperTradeService.closePosition(
      id,
      userID,
      symbol,
      isLong,
      price,
      quantity,
      account,
    );
  }

  @Patch('/cancelOrder/')
  async cancelOrder(
    @Body() order: { orderID: number; userID: number; account: string },
  ) {
    const { orderID, userID, account } = order;
    return await this.paperTradeService.cancelOrder(orderID, userID, account);
  }

  // @Get('/getInProgressOrderList')
  // async getInProgressOrderList(
  //   @Query('userID') userID: number,
  //   @Query('account') account: string,
  // ) {
  //   return await this.paperTradeService.getInProgressOrderList(userID, account);
  // }

  @Get('/getRecentOrderList')
  async getRecentOrderList(
    @Query('userID') userID: number,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getRecentOrderList(userID, account);
  }

  @Get('/getFullOrderList')
  async getFullOrderList(
    @Query('userID') userID: number,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getFullOrderList(userID, account);
  }

  @Get('/getPositionList')
  async getPositionList(
    @Query('userID') userID: number,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getPositionList(userID, account);
  }

  @Get('/getIndividualAccountDetail')
  async getIndividualAccountDetail(
    @Query('userID') userID: number,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getIndividualAccountDetail(
      userID,
      account,
    );
  }

  @Get('/getAccountList')
  async getAccountList(@Query('userID') userID: number) {
    return this.paperTradeService.getAccountList(userID);
  }
}
