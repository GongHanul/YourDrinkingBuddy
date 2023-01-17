import { Game } from './game.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface GamesService {
  addGame(game: Game): Promise<Game>;
  getGameByGameID(game_id: number): Promise<Game>;
  getGames(pageno: number, pagesize: number, query?: string): Promise<Pagination<Game>>;
  getAllGames(): Promise<Game[]>;
  updateGame(account: Game): Promise<Game>;
  deleteGameByGameID(game_id: number): Promise<void>;
}
