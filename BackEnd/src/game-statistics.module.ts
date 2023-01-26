import { Module } from '@nestjs/common';
import { GameStatistic } from './game-statistic.entity';
import { GameStatisticsController } from './game-statistics.controller';
import { GameStatisticsServiceImpl } from './game-statistics.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([GameStatistic])],
  controllers: [GameStatisticsController],
  providers: [GameStatisticsServiceImpl],
})
export class GameStatisticssModule {}
