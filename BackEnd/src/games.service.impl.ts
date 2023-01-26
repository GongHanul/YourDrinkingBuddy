import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GamesService } from './games.service';
import { GamesRepository } from './games.repository';
import { Game } from './game.entity';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';

const nameASC = { order: { name: 'ASC' } };
const nameDESC = { order: { name: 'DESC' } };
const idASC = { order: { beverage_id: 'ASC' } };
const idDESC = { order: { beverage_id: 'DESC' } };

@Injectable()
export class GamesServiceImpl implements GamesService {
  constructor(private gamesRepository: GamesRepository) {}
  async addGame(game: Game): Promise<Game> {
    const gameInstance = this.gamesRepository.create(game);
    await this.gamesRepository.insert(gameInstance);
    return gameInstance;
  }
  async getGameByGameID(game_id: number): Promise<Game> {
    return this.gamesRepository.findOneBy({ game_id });
  }
  async getGames(pageno: number, pagesize: number, query?: string, sort?: string): Promise<Pagination<Game>> {
    let searchOption = undefined;
    if (!query) {
      query = '';
    }
    if (sort) {
      switch (sort) {
        case 'name':
          searchOption = nameASC;
          break;
        case 'namedesc':
          searchOption = nameDESC;
          break;
        case 'new':
          searchOption = idASC;
          break;
        case 'old':
          searchOption = idDESC;
          break;
      }
    }
    searchOption['where'] = { game_name: Like(`%${query}%`) };
    return paginate<Game>(this.gamesRepository, { page: pageno, limit: pagesize }, searchOption);
  }
  async getAllGames(): Promise<Game[]> {
    return this.gamesRepository.find();
  }
  async updateGame(game: Game): Promise<Game> {
    const result = await this.gamesRepository.update({ game_id: game.game_id }, game);
    if (result.affected > 0) {
      return this.getGameByGameID(game.game_id);
    }
    throw new BadRequestException();
  }
  async deleteGame(game_id: number): Promise<void> {
    if ((await this.gamesRepository.delete(game_id)).affected == 0) {
      throw new NotFoundException();
    }
  }
}
