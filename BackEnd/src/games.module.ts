import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesServiceImpl } from './games.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';
import { GamesRepository } from './games.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([GamesRepository])],
  controllers: [GamesController],
  providers: [GamesServiceImpl],
})
export class GamesModule {}
