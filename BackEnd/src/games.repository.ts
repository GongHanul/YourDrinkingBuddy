import { Repository } from 'typeorm';
import { Game } from './game.entity';

export class GamesRepository extends Repository<Game> {}
