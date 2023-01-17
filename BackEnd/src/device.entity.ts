import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';
import { Account } from './account.entity.ts';

@Entity({ name: 'device' })
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @ManyToOne(type => Account)
  account: Account;

  @Column()
  @IsNotEmpty()
  @MaxLength(11)
  recipe_maker_ip: string;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  recipe_maker_port: number;
}
