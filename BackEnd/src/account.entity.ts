import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from './role';

@Entity({ name: 'account' })
export class Account {
  @PrimaryGeneratedColumn()
  account_id: number;

  @Column()
  @IsNotEmpty()
  account_user_id: string;

  @Column()
  @IsNotEmpty()
  account_user_password: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  account_name: string;

  @Column({ type: 'enum', enum: Role, default: Role.MANAGER })
  @IsNotEmpty()
  role: Role;

  @Column({ default: false })
  @IsNotEmpty()
  account_is_removed: boolean;

}
