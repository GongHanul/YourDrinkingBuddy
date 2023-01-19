import { IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryColumn } from 'typeorm';


@Entity({ name: 'game_statistic' })
export class GameStatistic {
  @PrimaryColumn()
  @IsNotEmpty()
  account_id: number;

  @PrimaryColumn()
  @IsNotEmpty()
  game_id: number;

  @Column()
  game_play_count: number;
}
