import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(Account)
export class AccountsRepository extends Repository<Account> {}
