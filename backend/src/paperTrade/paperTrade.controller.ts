import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PlaceOrderDTO } from './paperTrade.dto';
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

  @Patch('/cancelOrder/:id')
  async cancelOrder(@Param('id') id: string) {
    return await this.paperTradeService.cancelOrder(id);
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

  @Get('/getPositionList')
  async getPositionList(
    @Query('userID') userID: string,
    @Query('account') account: string,
  ) {
    return await this.paperTradeService.getPositionList(userID, account);
  }
}
