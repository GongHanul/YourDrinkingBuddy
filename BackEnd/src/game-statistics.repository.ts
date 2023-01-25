import { Repository } from 'typeorm';
import { GameStatistic } from './game-statistic.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GameStatisticsRepository extends Repository<GameStatistic> {}
