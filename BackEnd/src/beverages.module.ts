import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beverage } from './beverage.entity';
import { BeveragesController } from './beverages.controller';
import { BeveragesServiceImpl } from './beverages.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Beverage])],
  controllers: [BeveragesController],
  providers: [BeveragesServiceImpl],
})
export class BeveragesModule {}
