import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      console.log('enter post create use');
      createUserDto.password_hash = await hash(createUserDto.password, 10);
      delete createUserDto.password;
      return this.userService.create(createUserDto);
    } catch (err) {
      // throw new HttpException('');
      return { error: 'error during creating user' };
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
