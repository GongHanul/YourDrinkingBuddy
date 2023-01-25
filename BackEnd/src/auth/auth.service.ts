import { Inject, Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Login } from '../login.entity';
import { Payload } from './auth.payload';
import { AccountsServiceImpl } from 'src/accounts.service.impl';

@Injectable()
export class AuthService {
  constructor(@Inject(AccountsServiceImpl) private accountsService: AccountsService, private jwtService: JwtService) {}

  async validateAccount(account_user_id: string, account_user_password: string): Promise<any> {
    const user = await this.accountsService.getAccountByUserID(account_user_id);
    if (!user || bcrypt.compare(account_user_password, user.account_user_password)) {
      return null;
    }
    return user;
  }

  async login(login: Login) {
    const payload: Payload = { id: login.account_user_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
