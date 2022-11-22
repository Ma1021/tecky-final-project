import { Module } from '@nestjs/common';
import { AppController } from './stock.controller';
import { AppService } from './stock.service';
import { KnexModule } from 'nestjs-knex';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          database: 'stock',
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
