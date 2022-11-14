import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import knex from 'knex';
import { Interface } from 'readline';

interface NewUser {
  username: string;
  dob: Date;
}

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    await knex('users').insert;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
