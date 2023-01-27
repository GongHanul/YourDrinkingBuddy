import { Module } from '@nestjs/common';
import { DevicesController } from './devices.controller';
import { DevicesServiceImpl } from './devices.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';
import { DevicesRepository } from './devices.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([DevicesRepository])],
  controllers: [DevicesController],
  providers: [DevicesServiceImpl],
})
export class DevicesModule {}
