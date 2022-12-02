import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { S3Service } from 'src/s3.service';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      // the key would be valid for 1year
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [UserController],
  providers: [S3Service, UserService, AuthService],
  exports: [UserService],
})
export class UserModule {}
