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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { SubscriptionDTO } from './dto/subscription.dto';
import { UserIdDto } from './dto/userId.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/s3.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private authService: AuthService,
    private readonly s3Service: S3Service,
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
      console.log(err.message);
      throw new HttpException(
        '註冊失敗, 請再試一次或聯絡客服',
        HttpStatus.CONFLICT,
      );
    }
  }
  // update user data
  @Post(':id/update')
  @UseInterceptors(FileInterceptor('icon'))
  async updateInfo(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // createChatroomDto is ""
    // ! createChatroomDto = true
    try {
      console.log('entered upuate');
      let result;
      if (!!file) {
        let fileUpload = {
          fileBuffer: file.buffer,
          fileName: file.originalname,
          fileMimetype: file.mimetype,
        };
        let s3File = await this.s3Service.uploadFile(fileUpload);
        console.log(s3File);
        if (s3File == 'error') {
          throw new Error('圖片發生錯誤, 請重新輸入');
        }
        updateUserDto.icon = s3File;
        result = await this.userService.update(id, updateUserDto);
        // error when sending icon to s3
      } else {
        updateUserDto.icon = null;
        result = await this.userService.update(id, updateUserDto);
      }
      console.log('controller update user', result);
      return result;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
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
    // console.log('controller finoneid', result);
    return result;
  }

  // get the intro of user only
  @Post(':id/intro')
  async findIntro(@Param('id') id: number, @Body() userIdDto: UserIdDto) {
    let result = await this.userService.findIntro(id);
    // console.log('intro', result);
    return result;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Post(':id/delete')
  async remove(@Param('id') id: string, @Body() userIdDto: UserIdDto) {
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

    if (res.length <= 0) {
      throw new HttpException('Follower not found', HttpStatus.NOT_FOUND);
    }

    return res;
  }
}
