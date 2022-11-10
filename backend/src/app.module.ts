import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { KnexModule } from 'nest-knexjs';
import { env } from "../env";

@Module({
  imports: [
    QuestionModule,
    KnexModule.forRoot({
      config:{
        client:"pg",
        useNullAsDefault: true,
        connection: {
          user: env.DB_USERNAME,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
