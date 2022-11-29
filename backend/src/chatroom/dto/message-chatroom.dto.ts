import { IsNotEmpty } from 'class-validator';

export class MessageChatroomDto {
  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  chatroomId: number;
}
