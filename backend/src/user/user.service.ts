import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { Knex } from 'nestjs-knex';
import { InjectModel } from 'nest-knexjs';
import { SubscriptionDTO } from './dto/subscription.dto';
import { UserIdDto } from './dto/userId.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto) {
    // console.log('enter create user');
    try {
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
      console.log('created user service', rows[0]);
      return rows[0];
    } catch {
      (error) => {
        console.log(error);
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  findAll() {
    return `This action returns hrer user`;
  }

  async findOneId(id: string) {
    // return `This action returns #${username} user`;
    try {
      const user = await this.knex('users')
        .select('*')
        .where('id', +id);
      // console.log('service finoneid', user[0]);
      // console.log('findOneId', user[0]);
      return user[0];
    } catch {
      (error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  async findOne(email: string) {
    // return `This action returns #${username} user`;
    try {
      const user = await this.knex('users')
        .select('*')
        .where('email', email)
        .where('is_deleted', false);
      console.log('findone service', user);
      return user[0];
    } catch {
      (error) => {
        throw new HttpException(
          `find one error ${error}`,
          HttpStatus.BAD_REQUEST,
        );
      };
    }
  }

  async findIntro(id: number) {
    try {
      const result = await this.knex('users')
        .select('introduction')
        .where('id', id);
      return result[0];
    } catch {
      (error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  async getBlockUser(userIdDto: UserIdDto) {
    try {
      console.log('entered block ukser list', userIdDto);
      let result = await this.knex.raw(
        /*sql*/
        `
      select ARRAY_AGG(is_blocked) blocked_list from block_list 
      where blocker = ?
      group by blocker; 
      `,
        [+userIdDto.userId],
      );
      if (result.rows.length === 0) {
        // console.log('user service, blocker list', result);
        return [];
      }
      result = result.rows[0].blocked_list;
      console.log('user service, blocker list', result);
      return result;
    } catch {
      (error) => {
        console.log(error);
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  async blockUser(id: number, userIdDto: UserIdDto) {
    try {
      await this.knex('block_list').insert({
        blocker: userIdDto.userId,
        is_blocked: id,
      });
      let result = await this.knex.raw(
        /*sql*/
        `
      select ARRAY_AGG(is_blocked) blocked_list from block_list 
      where blocker = ?
      group by blocker; 
      `,
        [+userIdDto.userId],
      );
      result = result.rows[0].blocked_list;
      console.log('user service, update block list', result);
      return result;
    } catch {
      (error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  async unBlockUser(id: number, userIdDto: UserIdDto) {
    try {
      await this.knex('block_list')
        .del()
        .where({ blocker: userIdDto.userId, is_blocked: id })
        .returning('id');
      let result = await this.knex.raw(
        /*sql*/
        `
        select ARRAY_AGG(is_blocked) blocked_list from block_list 
        where blocker = ?
        group by blocker; 
        `,
        [+userIdDto.userId],
      );
      if (result.rows.length === 0) {
        console.log('user service, unblocker list', result);
        return [];
      }
      result = result.rows[0].blocked_list;
      console.log('user service, update unblock list', result);
      return result;
    } catch {
      (error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      let result = [];
      console.log('entered update service', updateUserDto);
      if (!updateUserDto.icon) {
        result = await this.knex('users')
          .update({
            introduction: updateUserDto.introduction,
            birthday: updateUserDto.birthday,
            gender: updateUserDto.gender,
            username: updateUserDto.username,
          })
          .where('id', id)
          .returning('id');
      } else {
        result = await this.knex('users')
          .update({
            introduction: updateUserDto.introduction,
            birthday: updateUserDto.birthday,
            gender: updateUserDto.gender,
            username: updateUserDto.username,
            avatar: updateUserDto.icon,
          })
          .where('id', id)
          .returning('id');
      }
      console.log('service user update', result[0]);
      return result[0];
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      // return `This action removes a #${id} user`;
      const user = await this.knex('users')
        .update({ is_deleted: true })
        .where('id', id)
        .returning('id');
      return user[0];
    } catch {
      (error) => {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      };
    }
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
            const res = await this.knex('subscriptions')
              .update({
                is_deleted: true,
                updated_at: this.knex.fn.now(),
                category: '取消關注',
              })
              .where('user_id', subscription.user_id)
              .andWhere('following_id', subscription.following_id)
              .returning('id');

            const max = Math.max(...res.map((obj) => obj.id));

            return [{ id: max }];
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
        'subscriptions.created_at',
        'users.push_notification_token',
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
        'users.introduction',
      )
      .where('user_id', user_id)
      .andWhere('subscriptions.is_deleted', false)
      .innerJoin('users', 'users.id', 'subscriptions.following_id');
  }

  countFollower() {
    return this.knex('subscriptions')
      .select(
        'users.id',
        'users.username',
        'users.introduction',
        'users.avatar',
      )
      .count('following_id as followers')
      .where('users.user_type', 'kol')
      .andWhere('subscriptions.is_deleted', false)
      .innerJoin('users', 'users.id', 'subscriptions.following_id')
      .groupBy('users.id')
      .orderBy('followers', 'desc');
  }
}
