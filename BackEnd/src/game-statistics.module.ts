import { Module } from '@nestjs/common';
import { GameStatisticsController } from './game-statistics.controller';
import { GameStatisticsServiceImpl } from './game-statistics.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';
import { GameStatisticsRepository } from './game-statistics.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([GameStatisticsRepository])],
  controllers: [GameStatisticsController],
  providers: [GameStatisticsServiceImpl],
})
export class GameStatisticssModule {}
