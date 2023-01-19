import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import env from './env/env.json';

@Entity({ name: 'beverage' })
export class Beverage {
  @PrimaryGeneratedColumn()
  beverage_id: number;

  @Column()
  @IsNotEmpty()
  beverage_name: string;

  @Column({ default: env.noImageUrl })
  beverage_image_url: string;
}
