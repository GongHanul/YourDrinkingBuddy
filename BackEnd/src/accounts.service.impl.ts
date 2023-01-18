import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { Pagination, IPaginationMeta, paginate } from 'nestjs-typeorm-paginate';
import { Role } from './role';

const responseSelect = { account_user_id: true, account_name: true, role: true };
const loginSelect = { account_id: true, account_user_id: true, role: true };

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: AccountsRepository,
  ) {}
  async getAccountByID(account_id: number): Promise<Account> {
    return this.accountsRepository.findOne({ select: responseSelect, where: { account_id: account_id } });
  }
  async addAccount(account: Account): Promise<Account> {
    const accountInstance = this.accountsRepository.create(account);
    await this.accountsRepository.insert(accountInstance);
    return accountInstance;
  }
  async getAccountByUserID(account_user_id: string): Promise<Account> {
    return this.accountsRepository.findOne({ select: responseSelect, where: { account_user_id: account_user_id } });
  }
  async getAccounts(pageno: number, pagesize: number, role?: string): Promise<Pagination<Account, IPaginationMeta>> {
    let roleData = Role.MANAGER;
    switch (role) {
      case 'manager':
        roleData = Role.MANAGER;
      case 'admin':
        roleData = Role.ADMIN;
    }
    return paginate<Account>(this.accountsRepository, { page: pageno, limit: pagesize }, roleData ? { where: { role: roleData } } : undefined);
  }
  async getAllAccount(): Promise<Account[]> {
    return this.accountsRepository.find();
  }
  async updateAccount(account: Account): Promise<Account> {
    const result = await this.accountsRepository.update({ account_id: account.account_id }, account);
    if (result.affected > 0) {
      return this.getAccountByID(account.account_id);
    }
    throw new BadRequestException();
  }
  async deleteAccountByUserID(account_id: number): Promise<void> {
    const result = await this.accountsRepository.update({ account_id: account_id }, { account_is_removed: true });
    if (result.affected == 0) {
      throw new BadRequestException();
    }
  }
  async login(account_user_id: string, account_user_password: string): Promise<void> {
    const account_id = this.auth(account_user_id, account_user_password);
    //
    //
    // Session Level Logic
    //
    //
    throw new Error('Authentication Module Needed');
  }
  async logout(): Promise<void> {
    //
    //
    // Session Level Logic
    //
    //
    throw new Error('Authentication Module Needed');
  }

  private async auth(account_user_id: string, account_user_password: string): Promise<number> {
    const user = await this.accountsRepository.findOne({ select: loginSelect, where: { account_user_id: account_user_id } });
    if (!user) {
      throw new ForbiddenException();
    }
    if (user.account_user_password !== account_user_password) {
      throw new ForbiddenException();
    }
    return user.account_id;
  }
}
