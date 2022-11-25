import { IsNotEmpty } from 'class-validator';

export class EnteringChatroomDto {
  @IsNotEmpty()
  user: number;
}
