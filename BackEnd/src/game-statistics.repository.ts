import { Repository } from 'typeorm';
import { GameStatistic } from './game-statistic.entity';

export class GameStatisticsRepository extends Repository<GameStatistic> {}
