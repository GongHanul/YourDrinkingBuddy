import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountsService } from './accounts.service';
import { AccountsRepository } from './accounts.repository';
import { Account } from './account.entity';

@Injectable()
export class AccountsServiceImpl implements AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: AccountsRepository,
  ) {}
}
