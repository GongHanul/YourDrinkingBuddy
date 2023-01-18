import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

@Entity({ name: 'device' })
export class Device {
  @PrimaryGeneratedColumn()
  device_id: number;

  @Column()
  private account_id: number;

  @Column()
  @IsNotEmpty()
  @MaxLength(11)
  recipe_maker_ip: string;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  recipe_maker_port: number;

  public setAccount(account_id: number){
    this.account_id = account_id;
  }
}
