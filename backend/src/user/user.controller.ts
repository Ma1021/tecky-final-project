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
import { SubscriptionDTO } from './dto/subscription.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('enter create user');
    try {
      if (createUserDto.password !== createUserDto.rePassword) {
        throw new Error('密碼不一致');
      }
      createUserDto.password_hash = await hash(createUserDto.password, 10);
      delete createUserDto.password;
      delete createUserDto.rePassword;
      let userObj = await this.userService.create(createUserDto);
      if (userObj.id) {
        let {
          id,
          username,
          email,
          avatar,
          introduction,
          birthday,
          gender,
          user_type,
        } = userObj;
        let token = await this.authService.login(userObj);
        let returnObj = {
          user: {
            id,
            username,
            email,
            avatar,
            introduction,
            birthday,
            gender,
            user_type,
          },
          token,
        };
        return returnObj;
      }
    } catch (err) {
      if (err.constraint == 'users_email_unique') {
        throw new HttpException('此電郵已登記', HttpStatus.CONFLICT);
      } else if (err.message.includes('密碼不一致')) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(
        '註冊失敗, 請再試一次或聯絡客服',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // should be updated as username or both username and id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.userService.findOneId(id);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    let result = await this.userService.remove(+id);
    return result;
  }

  // get all followers of user
  @Get('/followers/:id')
  findFollowers(@Param('id') user_id: string) {
    if (!user_id) {
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    }
    return this.userService.findFollowers(+user_id);
  }

  // get all following of user
  @Get('/followings/:id')
  findFollowings(@Param('id') user_id: string) {
    if (!user_id) {
      throw new HttpException('Missing user id', HttpStatus.BAD_REQUEST);
    }
    return this.userService.findFollowings(+user_id);
  }

  // handle user following and unFollowing
  @Post('/subscriptions')
  handleSubscription(@Body() subscription: SubscriptionDTO) {
    if (subscription.user_id === subscription.following_id) {
      throw new HttpException(
        'follower id and following id can not be same',
        HttpStatus.CONFLICT,
      );
    }
    return this.userService.handleSubscription(subscription);
  }

  // handel kol followers counting
  @Get('/follower/count')
  async findFollowerCount() {
    const res = await this.userService.countFollower();

    if(res.length <= 0) {
      throw new HttpException('Follower not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }
}
