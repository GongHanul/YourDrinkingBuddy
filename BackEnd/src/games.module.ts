import { Module } from '@nestjs/common';
import { Game } from './game.entity';
import { GamesController } from './games.controller';
import { GamesServiceImpl } from './games.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([Game])],
  controllers: [GamesController],
  providers: [GamesServiceImpl],
})
export class GamesModule {}
