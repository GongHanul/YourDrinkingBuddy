import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BeveragesModule } from './beverages.module';
import { AccountsModule } from './accounts.module';
import { GameStatisticssModule } from './game-statistics.module';
import { GamesModule } from './games.module';
import { DevicesModule } from './devices.module';
import { RecipesModule } from './recipes.module';

import { Beverage } from './beverage.entity';
import { Account } from './account.entity';
import { Game } from './game.entity';
import { Device } from './device.entity';
import { GameStatistic } from './game-statistic.entity';
import { Recipe } from './recipe.entity';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ssafy',
      password: 'ssafy',
      database: 'ssafy_project',
      entities: [Beverage, Account, Game, Device, GameStatistic, Recipe, RecipeIngredient],
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
