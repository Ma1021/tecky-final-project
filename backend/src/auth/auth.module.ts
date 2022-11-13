import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    // PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // the key would be valid for 1day
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController, LocalStrategy],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
