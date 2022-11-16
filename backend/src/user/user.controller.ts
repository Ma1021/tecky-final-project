import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.password_hash = await hash(createUserDto.password, 10);
      delete createUserDto.password;
      delete createUserDto.rePassword;
      let user = { userId: await this.userService.create(createUserDto) };
      console.log('user controller: user id returned', user);
      if (user.userId) {
        let token = this.authService.login(user);
        return token;
      }
    } catch (err) {
      throw new HttpException('註冊失敗', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // should be updated as username or both username and id
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
