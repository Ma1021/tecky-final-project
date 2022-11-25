import { IsNotEmpty } from 'class-validator';

export class JoinChatroomDto {
  @IsNotEmpty()
  member: number;

  @IsNotEmpty()
  chatroomId: number;
}
