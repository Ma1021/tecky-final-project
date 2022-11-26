import { IsNotEmpty } from 'class-validator';

export class JoinChatroomDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  chatroomId: number;
}
