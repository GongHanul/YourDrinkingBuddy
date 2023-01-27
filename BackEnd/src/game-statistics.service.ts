import { GameStatistic } from './game-statistic.entity';

export interface GameStatisticsService {
  notifyPlay(account_id: number, game_id: number): Promise<GameStatistic>;
  getAllGameStatistic(account_id: number): Promise<GameStatistic[]>;
}
