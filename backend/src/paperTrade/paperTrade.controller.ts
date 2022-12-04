import { Controller, Get, Post, Query } from '@nestjs/common';
import { PaperTradeService } from './paperTrade.service';

@Controller('/paperTrade')
export class PaperTradeController {
  constructor(private readonly paperTradeService: PaperTradeService) {}

  @Post('/placeOrder')
  async placeOrder(
    @Query('userID') userID: string,
    @Query('stockID') stockID: string,
    @Query('orderType') orderType: string,
    @Query('price') price: string,
    @Query('quantity') quantity: string,
  ) {
    return await this.paperTradeService.placeOrder(
      userID,
      stockID,
      orderType,
      price,
      quantity,
    );
  }
}
