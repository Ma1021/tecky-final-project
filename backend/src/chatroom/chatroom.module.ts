import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { S3Service } from 'src/s3.service';
import { HttpModule } from '@nestjs/axios';
import { ChatroomStrategy } from './chatroom.strategy';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [HttpModule, AuthModule],
  controllers: [ChatroomController],
  providers: [ChatroomService, S3Service, ChatroomStrategy],
})
export class ChatroomModule {}
