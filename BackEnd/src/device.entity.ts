import { Entity, PrimaryColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, MaxLength } from 'class-validator';

@Entity({ name: 'device' })
export class Device {
  @PrimaryColumn()
  device_mac_address: string;

  @Column()
  private account_id: number;

  @Column()
  @IsNotEmpty()
  device_name: string;

  // @Column()
  // @IsNotEmpty()
  // @MaxLength(15)
  // recipe_maker_ip: string;

  // @Column()
  // @IsNotEmpty()
  // @IsPositive()
  // recipe_maker_port: number;

  public setAccount(account_id: number) {
    this.account_id = account_id;
  }

  public equalsAccount(account_id: number): boolean {
    return this.account_id === account_id;
  }
}
