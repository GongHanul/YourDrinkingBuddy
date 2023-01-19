import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeveragesModule } from './beverages.module';
import { AccountsModule } from './accounts.modules';
import { GameStatisticssModule } from './game-statistics.modules';
import { GamesModule } from './games.modules';
import { DevicesModule } from './devices.modules';
import { RecipesModule } from './recipes.modules';

import { Beverage } from './beverage.entity';
import { Account } from './account.entity';
import { Game } from './game.entity';
import { Device } from './device.entity';
import { GameStatistic } from './game-statistic.entity';
import { Recipe } from './recipe.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ssafy',
      password: 'ssafy',
      database: 'ssafy_project',
      entities: [Beverage, Account, Game, Device, GameStatistic, Recipe],
      synchronize: false,
      timezone: '+09:00',
      charset: 'utf8mb4',
    }),
    BeveragesModule,
    AccountsModule,
    GamesModule,
    DevicesModule,
    GameStatisticssModule,
    RecipesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
