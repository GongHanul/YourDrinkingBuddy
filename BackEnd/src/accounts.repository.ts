import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountsRepository extends Repository<Account> {}
