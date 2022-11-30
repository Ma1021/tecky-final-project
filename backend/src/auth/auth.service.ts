import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // must be username and password_hash unless updated in local strategy
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      if (await compare(password, user.password_hash)) {
        console.log(await compare(password, user.password_hash));
        const { password_hash, ...result } = user;
        return result;
      }
      throw new HttpException('密碼不正確', HttpStatus.UNAUTHORIZED);
    }

    return null;
  }

  async login(user: any) {
    const payload = { sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
