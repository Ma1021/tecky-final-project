import { Injectable } from '@nestjs/common';
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
    console.log('add new user');
    createUserDto.password_hash = await hash(createUserDto.password, 10);
    delete createUserDto.password;
    const newUser = await this.knex('users')
      .insert(createUserDto)
      .returning('*');

    console.log('new user created', newUser);
    return newUser;
  }

  findAll() {
    return `This action returns all user`;
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
