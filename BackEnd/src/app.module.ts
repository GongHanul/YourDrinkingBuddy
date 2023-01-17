/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import databaseEnv from 'src/env/databaseEnv.json';

import { BeveragesModule } from './beverages.module';
import { Beverage } from './beverage.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'ssafy',
    password: 'ssafy',
    database: 'ssafy_project',
    entities: [Beverage],
    synchronize: false,
    timezone: '+09:00',
    charset: 'utf8mb4'
  }
), BeveragesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
