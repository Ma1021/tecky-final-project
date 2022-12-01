import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserIdDto {
  @IsNotEmpty()
  userId: number;
}
