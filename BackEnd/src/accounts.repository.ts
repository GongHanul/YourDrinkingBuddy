import { Repository } from 'typeorm';
import { Account } from './account.entity';

export class AccountsRepository extends Repository<Account> {}
