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
import db from './env/db.json';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: db.host,
      port: db.port,
      username: db.username,
      password: db.password,
      database: db.database,
      entities: [Beverage, Account, Game, Device, GameStatistic, Recipe, RecipeIngredient],
      synchronize: false,
      timezone: db.timezone,
      charset: db.charset,
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
