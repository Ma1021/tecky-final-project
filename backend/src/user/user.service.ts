import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { Knex } from 'nestjs-knex';
import { InjectModel } from 'nest-knexjs';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    // try {
    const newUser = await this.knex('users')
      .insert(createUserDto)
      .returning('id');
    return newUser[0].id;
    //   } catch (error) {
    //     if (error.message.includes('duplicate')) {
    //       throw new Error('電郵已註冊');
    //     }
    //   }
  }

  findAll() {
    return `This action returns hrer user`;
  }

  async findOne(username: string) {
    // return `This action returns #${username} user`;
    return {
      id: 1,
      username: username,
      password_hash: await hash('123456', 10),
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
