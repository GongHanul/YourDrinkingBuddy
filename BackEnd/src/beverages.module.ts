import { Module } from '@nestjs/common';
import { BeveragesController } from './beverages.controller';
import { BeveragesServiceImpl } from './beverages.service.impl';
import { BeveragesRepository } from './beverages.repository';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BeveragesRepository])],
  controllers: [BeveragesController],
  providers: [BeveragesServiceImpl],
})
export class BeveragesModule {}
