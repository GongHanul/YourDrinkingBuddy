import { Entity, Column, ManyToMany, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { Game } from './game.entity';

@Entity()
export class GameStatistic {

  @ManyToOne(type => Account)
  account: Account;

  @ManyToOne(type => Game)
  account: Game;

  @Column()
  game_play_count: number;
}
