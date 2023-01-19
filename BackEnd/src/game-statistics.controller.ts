import { Controller, Get, Param, Post, Inject } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { GameStatisticsServiceImpl } from './game-statistics.service.impl';
import { GameStatisticsService } from './game-statistics.service';
import { GameStatistic } from './game-statistic.entity';

@Controller('game/result')
export class GameStatisticsController {
  @Inject(GameStatisticsServiceImpl)
  gameStatisticsService: GameStatisticsService;

  @Post(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<GameStatistic> {
    return this.gameStatisticsService.notifyPlay(12345678, id);
  }

  @Get()
  async getAll(): Promise<GameStatistic[]> {
    return this.gameStatisticsService.getAllGameStatistic(12345678);
  }
}
