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
  async notifyPlay(account_id: number, game_id: number): Promise<GameStatistic> {
    // 갱신할 statistics를 찾는다.
    let gameStatisticInstance = await this.gameStatisticsRepository.findOne({ where: { account_id: account_id, game_id: game_id } });
    if (gameStatisticInstance) {
      // 있으면 play_count를 증가시킨다.
      gameStatisticInstance.game_play_count++;
      this.gameStatisticsRepository.update({ account_id: account_id, game_id: game_id }, gameStatisticInstance);
    } else {
      // 없으면 신규로 생성한다.
      gameStatisticInstance = new GameStatistic();
      gameStatisticInstance.account_id = account_id;
      gameStatisticInstance.game_id = game_id;
      gameStatisticInstance.game_play_count = 1;
      this.gameStatisticsRepository.insert(gameStatisticInstance);
    }
    return gameStatisticInstance;
  }
  async getAllGameStatistic(account_id: number): Promise<GameStatistic[]> {
    return this.gameStatisticsRepository.find({ where: { account_id: account_id } });
  }
}
