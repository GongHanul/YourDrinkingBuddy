import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(account_user_id: string, account_user_password: string): Promise<any> {
    const user = await this.authService.validateAccount(account_user_id, account_user_password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
