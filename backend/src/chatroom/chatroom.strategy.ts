import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ChatroomService } from './chatroom.service';

@Injectable()
export class ChatroomStrategy extends PassportStrategy(Strategy, 'chatroom') {
  constructor(private chatroomService: ChatroomService) {
    super({
      usernameField: 'userId',
      passwordField: 'chatroomId',
    });
  }

  async validate(userId: number, chatroomId: number): Promise<any> {
    console.log('enter chatroom validation');
    const user = await this.chatroomService.validateUser({
      userId: +userId,
      chatroomId: +chatroomId,
    });
    if (!user) {
      throw new HttpException('未加入此聊天室', HttpStatus.UNAUTHORIZED);
      // throw new UnauthorizedException();
    }
    return user;
  }
}
