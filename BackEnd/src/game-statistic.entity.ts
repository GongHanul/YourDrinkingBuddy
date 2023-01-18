import { Entity, Column, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Game } from './game.entity';

@Entity({ name: 'game_statistic' })
export class GameStatistic {
  @ManyToOne(() => Account)
  account: Account;

  @ManyToOne(() => Game)
  game: Game;

  @Column()
  game_play_count: number;
}
