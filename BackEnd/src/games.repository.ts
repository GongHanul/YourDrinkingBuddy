import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(Game)
export class GamesRepository extends Repository<Game> {}
