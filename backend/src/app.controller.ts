import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/search')
  async searchFromRedis(@Query('keyword') keyword: string) {
    console.log('search');
    let result = await this.appService.searchFromRedis(keyword);
    console.log('result is ,', result);
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    try {
      // console.log('enter auth/login');
      console.log('/login', req.user);
      let access_token = await this.authService.login(req.user);
      let {
        id,
        username,
        email,
        avatar,
        introduction,
        birthday,
        gender,
        user_type,
      } = req.user;
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
        token: access_token.access_token,
      };
      console.log('returnObj', returnObj);
      //format of json return: { user: {id: userObj}, access_token: token}

      return returnObj;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() req) {
    console.log('/profile', req.user);
    return req.user;
  }
}
