import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { KnexModule } from 'nest-knexjs';
import { env } from '../env';
import { AuthModule } from './auth/auth.module';
import { AnswerModule } from './answer/answer.module';
import { NotificationModule } from './notification/notification.module';

let profile = require('../knexfile')[env.NODE_ENV];

@Module({
  imports: [
    QuestionModule,
    KnexModule.forRoot({ config: profile }),
    AuthModule,
    AnswerModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
