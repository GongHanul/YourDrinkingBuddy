import { Controller, Get, Param, Query, Put, Body, Post, Delete, Inject, HttpCode } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ParseIntPipe } from '@nestjs/common';
import { GamesServiceImpl } from './games.service.impl';
import { GamesService } from './games.service';
import { Game } from './game.entity';

@Controller('games')
export class GamesController {
  @Inject(GamesServiceImpl)
  gamesService: GamesService;

  @Get()
  async getAll(@Query('pageno') pageno?: number, @Query('pagesize') pagesize?: number, @Query('sort') sort?: string, @Query('query') query?: string): Promise<Pagination<Game>> {
    return this.gamesService.getGames(pageno ? pageno : 1, pagesize ? pagesize : 10, sort, query);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Game> {
    return this.gamesService.getGameByGameID(id);
  }

  @Post()
  async post(@Body() dto: Game): Promise<Game> {
    return this.gamesService.addGame(dto);
  }

  @Put()
  async put(@Body() dto: Game): Promise<Game> {
    return this.gamesService.updateGame(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.gamesService.deleteGame(id);
  }
}
