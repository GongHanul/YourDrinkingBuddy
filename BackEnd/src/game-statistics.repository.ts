import { Repository } from 'typeorm';
import { GameStatistic } from './game-statistic.entity';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(GameStatistic)
export class GameStatisticsRepository extends Repository<GameStatistic> {}
