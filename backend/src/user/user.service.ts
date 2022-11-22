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
    const newUser = await this.knex.raw(
      `
        Insert Into users (username, birthday, gender, email, password_hash) Values (?,?,?,?,?) Returning *;
        `,
      [
        createUserDto.username,
        createUserDto.birthday,
        createUserDto.gender,
        createUserDto.email,
        createUserDto.password_hash,
      ],
    );
    let result = await newUser;
    let rows = result.rows;
    return rows[0];
  }

  findAll() {
    return `This action returns hrer user`;
  }

  async findOneId(id: string) {
    // return `This action returns #${username} user`;
    const user = await this.knex('users').select('*').where('id', id);

    console.log(user[0]);
    return user[0];
  }

  async findOne(email: string) {
    // return `This action returns #${username} user`;
    const user = await this.knex('users')
      .select('*')
      .where('email', email)
      .where('is_deleted', false);
    return user[0];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    // return `This action removes a #${id} user`;
    const user = await this.knex('users')
      .update({ is_deleted: true })
      .where('id', id);
  }
}
