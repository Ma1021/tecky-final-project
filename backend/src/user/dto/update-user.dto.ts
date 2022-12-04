import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  birthday: Date;

  gender: 'M' | 'F';

  @IsNotEmpty()
  introduction: string;

  icon: string;
}
