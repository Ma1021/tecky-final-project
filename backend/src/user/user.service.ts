import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { Knex } from 'nestjs-knex';
import { InjectModel } from 'nest-knexjs';
import { SubscriptionDTO } from './dto/subscription.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    // console.log('enter create user');
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

    // console.log('findOneId', user[0]);
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
      .where('id', id)
      .returning('id');
    return user[0];
  }

  handleSubscription(subscription: SubscriptionDTO) {
    try {
      return this.knex('subscriptions')
        .select('*')
        .where('user_id', subscription.user_id)
        .andWhere('following_id', subscription.following_id)
        .then(async (subscriptionList) => {
          if (subscriptionList.length > 0) {
            return await this.knex('subscriptions')
              .where('user_id', subscription.user_id)
              .andWhere('following_id', subscription.following_id)
              .del()
              .returning('id');
          } else {
            return await this.knex('subscriptions')
              .insert(subscription)
              .returning('id');
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  findFollowers(user_id: number) {
    return this.knex('subscriptions')
      .select(
        'subscriptions.id',
        'users.id as user_id',
        'users.username',
        'users.avatar',
      )
      .where('following_id', user_id)
      .innerJoin('users', 'users.id', 'subscriptions.user_id');
  }

  findFollowings(user_id: number) {
    return this.knex('subscriptions')
      .select(
        'subscriptions.id',
        'users.id as user_id',
        'users.username',
        'users.avatar',
      )
      .where('user_id', user_id)
      .innerJoin('users', 'users.id', 'subscriptions.following_id');
  }
}
