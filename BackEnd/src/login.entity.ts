import { IsNotEmpty } from 'class-validator';

export class Login {
  @IsNotEmpty()
  account_user_id: string;

  @IsNotEmpty()
  account_user_password: string;
}
