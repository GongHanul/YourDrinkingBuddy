import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity({ name: 'game' })
export class Game {
  @PrimaryGeneratedColumn()
  game_id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  game_name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  game_desc: string;
}
