import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, Length } from 'class-validator';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  @Length(17)
  device_id: string;

  @Column()
  @IsNotEmpty()
  @Length(11)
  recipe_maker_ip: string;

  @Column()
  @IsNotEmpty()
  @IsPositive()
  recipe_maker_port: number;
}
