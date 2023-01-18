import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';
import { Device } from './device.entity';

@Injectable()
export class DevicesServiceImpl implements DevicesService {
  constructor(
    @InjectRepository(Device)
    private devicesRepository: DevicesRepository,
  ) {}
}
