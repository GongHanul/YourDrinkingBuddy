import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesRepository extends Repository<Game> {}
