import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  birthday: Date;

  @IsNotEmpty()
  gender: 'M' | 'F';

  @IsNotEmpty()
  introduction: string;

  icon: string;
}
