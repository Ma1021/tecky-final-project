import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // take jwt from header everytime to take
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // could ignore the expired time set on auth/auth.module.ts
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    console.log('validate in jwtSTrategy', payload);
    console.log('id in jwtSTrategy', payload.sub);
    return { id: payload.sub };
  }
}
