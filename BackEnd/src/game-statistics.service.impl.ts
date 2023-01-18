import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameStatisticsService } from './game-statistics.service';
import { GameStatisticsRepository } from './game-statistics.repository';
import { GameStatistic } from './game-statistic.entity';

@Injectable()
export class GameStatisticsServiceImpl implements GameStatisticsService {
  constructor(
    @InjectRepository(GameStatistic)
    private gameStatisticsRepository: GameStatisticsRepository,
  ) {}
  notifyPlay(account_id: number, game_id: number): Promise<GameStatistic> {
    throw new Error('Method not implemented.');
  }
  getAllGameStatistic(account_id: number): Promise<GameStatistic[]> {
    throw new Error('Method not implemented.');
  }
}
