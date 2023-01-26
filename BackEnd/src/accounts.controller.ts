import { Controller, Get, Param, Put, Body, Post, Delete, Inject, HttpCode, UseGuards } from '@nestjs/common';
import { AccountsServiceImpl } from './accounts.service.impl';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { Login } from './login.entity';
// import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller('accounts')
export class AccountsController {
  @Inject(AccountsServiceImpl)
  accountsService: AccountsService;
  authService: AuthService;

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async get(@Param('user_id') user_id: string): Promise<Account> {
    return this.accountsService.getAccountByUserID(user_id);
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async post(@Body() dto: Account): Promise<Account> {
    return this.accountsService.addAccount(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Put()
  async put(@Body() dto: Account): Promise<Account> {
    return this.accountsService.updateAccount(dto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete(':user_id')
  @HttpCode(204)
  async delete(@Param('user_id') user_id: string) {
    await this.accountsService.deleteAccountByUserID(user_id);
  }

  // @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() login: Login) {
    return this.authService.login(login);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('logout')
  @HttpCode(204)
  async logout() {
    throw new Error('Not Implemented');
  }
}
