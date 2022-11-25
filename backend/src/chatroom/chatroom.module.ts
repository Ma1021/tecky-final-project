import { Module } from '@nestjs/common';
import { ChatroomService } from './chatroom.service';
import { ChatroomController } from './chatroom.controller';
import { S3Service } from 'src/s3.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ChatroomController],
  providers: [ChatroomService, S3Service],
})
export class ChatroomModule {}
