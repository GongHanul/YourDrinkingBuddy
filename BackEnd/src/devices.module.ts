import { Module } from '@nestjs/common';
import { Device } from './device.entity';
import { DevicesController } from './devices.controller';
import { DevicesServiceImpl } from './devices.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([Device])],
  controllers: [DevicesController],
  providers: [DevicesServiceImpl],
})
export class DevicesModule {}
