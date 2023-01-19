import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DevicesController } from './devices.controller';
import { DevicesServiceImpl } from './devices.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [DevicesController],
  providers: [DevicesServiceImpl],
})
export class DevicesModule {}
