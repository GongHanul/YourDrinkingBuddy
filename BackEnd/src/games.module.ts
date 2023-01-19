import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesServiceImpl } from './games.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Game])],
  controllers: [GamesController],
  providers: [GamesServiceImpl],
})
export class GamesModule {}
