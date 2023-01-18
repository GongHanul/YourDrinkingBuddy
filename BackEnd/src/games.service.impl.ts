import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { Game } from './game.entity';

@Injectable()
export class GamesServiceImpl implements GamesService {
  constructor(
    @InjectRepository(Game)
    private gamesRepository: GamesRepository,
  ) {}
}
