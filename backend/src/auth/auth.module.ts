import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ChatroomStrategy } from '../chatroom/chatroom.strategy';

@Module({
  imports: [
    UserModule,
    // PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // the key would be valid for 1year
      signOptions: { expiresIn: '365d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
