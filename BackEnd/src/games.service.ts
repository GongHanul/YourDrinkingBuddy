import { Game } from './game.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface GamesService {
  addGame(game: Game): Promise<Game>;
  getGameByGameID(game_id: number): Promise<Game>;
  getGames(pageno: number, pagesize: number, sort?: string, query?: string): Promise<Pagination<Game>>;
  getAllGames(): Promise<Game[]>;
  updateGame(game: Game): Promise<Game>;
  deleteGame(game_id: number): Promise<void>;
}
