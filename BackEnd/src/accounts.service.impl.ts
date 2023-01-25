import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Role } from './role';
import * as bcrypt from 'bcrypt';

const responseSelect = { account_user_id: true, account_name: true, role: true };

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: AccountsRepository,
  ) {}
  async getAccountByID(account_id: number): Promise<Account> {
    return this.accountsRepository.findOne({ select: responseSelect, where: { account_id: account_id, account_is_removed: false } });
  }
  async addAccount(account: Account): Promise<Account> {
    const accountInstance = this.accountsRepository.create(account);
    accountInstance.account_user_password = await bcrypt.hash(accountInstance.account_user_password, 10);
    await this.accountsRepository.insert(accountInstance);
    return accountInstance;
  }
  async getAccountByUserID(account_user_id: string): Promise<Account> {
    return this.accountsRepository.findOne({ select: responseSelect, where: { account_user_id: account_user_id, account_is_removed: false } });
  }
  async getAccounts(pageno: number, pagesize: number, role?: string): Promise<Pagination<Account>> {
    let roleData = Role.MANAGER;
    switch (role) {
      case 'manager':
        roleData = Role.MANAGER;
      case 'admin':
        roleData = Role.ADMIN;
    }
    return paginate<Account>(this.accountsRepository, { page: pageno, limit: pagesize }, roleData ? { where: { role: roleData, account_is_removed: false } } : { account_is_removed: false });
  }
  async getAllAccount(): Promise<Account[]> {
    return this.accountsRepository.find({ where: { account_is_removed: false } });
  }
  async updateAccount(account: Account): Promise<Account> {
    const result = await this.accountsRepository.update({ account_id: account.account_id }, account);
    if (result.affected > 0) {
      return this.getAccountByID(account.account_id);
    }
    throw new BadRequestException();
  }
  async deleteAccountByUserID(account_user_id: string): Promise<void> {
    const result = await this.accountsRepository.update({ account_user_id: account_user_id }, { account_is_removed: true });
    if (result.affected == 0) {
      throw new BadRequestException();
    }
  }
}
