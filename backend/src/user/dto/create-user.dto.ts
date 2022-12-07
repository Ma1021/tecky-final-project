import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  birthday: Date;

  gender: 'M' | 'F' | null;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  password_hash: string;

  password: string;
  rePassword: string;
}
