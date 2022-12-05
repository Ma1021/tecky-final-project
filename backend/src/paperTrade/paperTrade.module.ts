import { Module } from '@nestjs/common';
import { PaperTradeController } from './paperTrade.controller';
import { PaperTradeService } from './paperTrade.service';

@Module({
  controllers: [PaperTradeController],
  providers: [PaperTradeService],
})
export class PaperTradeModule {}
