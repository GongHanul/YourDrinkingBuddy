import { Controller, Get, Param, Put, Body, Post, Delete, Inject, HttpCode } from '@nestjs/common';
import { AccountsServiceImpl } from './accounts.service.impl';
import { AccountsService } from './accounts.service';
import { Account } from './account.entity';
import { Login } from './login.entity';

@Controller('account')
export class AccountsController {
  @Inject(AccountsServiceImpl)
  accountsService: AccountsService;

  @Get(':id')
  async get(@Param('user_id') user_id: string): Promise<Account> {
    return this.accountsService.getAccountByUserID(user_id);
  }

  @Post()
  async post(@Body() dto: Account): Promise<Account> {
    return this.accountsService.addAccount(dto);
  }

  @Put()
  async put(@Body() dto: Account): Promise<Account> {
    return this.accountsService.updateAccount(dto);
  }

  @Delete(':user_id')
  @HttpCode(204)
  async delete(@Param('user_id') user_id: string) {
    //
    // auth logic
    //
    await this.accountsService.deleteAccountByUserID(12345678);
  }

  @Post('login')
  async login(@Body() login: Login) {}

  @Get('logout')
  @HttpCode(204)
  async logout() {}
}
