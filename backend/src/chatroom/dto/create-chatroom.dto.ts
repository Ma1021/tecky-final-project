import { IsNotEmpty } from 'class-validator';

export class CreateChatroomDto {
  @IsNotEmpty()
  host: number;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: 'M' | 'F';

  @IsNotEmpty()
  email: string;

  password_hash: string;

  password: string;
  rePassword: string;
}
