import { IsNotEmpty } from 'class-validator';

export class CreateChatroomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  introduction: string;

  icon: string;

  @IsNotEmpty()
  host: number;
}
