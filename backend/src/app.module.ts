import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { KnexModule } from 'nest-knexjs';
import { env } from '../env';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    QuestionModule,
    KnexModule.forRoot({
      config: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
          user: env.DB_USERNAME,
          password: env.DB_PASSWORD,
          database: env.DB_NAME,
          charset: 'utf8',
        },
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
