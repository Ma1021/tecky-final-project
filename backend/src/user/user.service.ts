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
        .andWhere('is_deleted', false)
        .then(async (subscriptionList) => {
          if (subscriptionList.length > 0) {
            return await this.knex('subscriptions')
            .update({is_deleted: true, updated_at:this.knex.fn.now(), category:"取消關注"})
            .where('user_id', subscription.user_id)
            .andWhere('following_id', subscription.following_id)
            .returning('*');
          } else {
            return await this.knex('subscriptions')
              .insert(subscription)
              .returning('*');
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
        'users.introduction',
        'subscriptions.created_at'
      )
      .where('following_id', user_id)
      .andWhere('subscriptions.is_deleted', false)
      .innerJoin('users', 'users.id', 'subscriptions.user_id');
  }

  findFollowings(user_id: number) {
    return this.knex('subscriptions')
      .select(
        'subscriptions.id',
        'users.id as user_id',
        'users.username',
        'users.avatar',
        'users.introduction'
      )
      .where('user_id', user_id)
      .andWhere('subscriptions.is_deleted', false)
      .innerJoin('users', 'users.id', 'subscriptions.following_id');
  }

  countFollower() {
    return this.knex('subscriptions').select('users.id', 'users.username', 'users.introduction', 'users.avatar')
    .count('following_id as followers')
    .where('users.user_type', 'kol')
    .andWhere('subscriptions.is_deleted', false)
    .innerJoin('users', 'users.id', 'subscriptions.following_id')
    .groupBy('users.id')
    .orderBy('followers', 'desc');
  }
}
