import { Account } from './account.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
export interface AccountsService {
  addAccount(account: Account): Promise<Account>;
  getAccountByID(account_id: number): Promise<Account>;
  getAccountByUserID(account_user_id: string): Promise<Account>;
  getAccounts(pageno: number, pagesize: number, role?: string): Promise<Pagination<Account>>;
  getAllAccount(): Promise<Account[]>;
  updateAccount(account: Account): Promise<Account>;
  deleteAccountByUserID(account_id: number): Promise<void>;
  login(account_user_id: string, account_user_password: string): Promise<void>;
  logout(): Promise<void>;
}
