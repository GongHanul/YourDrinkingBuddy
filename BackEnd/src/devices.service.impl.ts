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
  addDevice(account_id: number, device: Device): Promise<Device> {
    throw new Error('Method not implemented.');
  }
  getDeviceByDeviceID(account_id: number, device_id: number): Promise<Device> {
    throw new Error('Method not implemented.');
  }
  getAllDevices(account_id: number, query?: string): Promise<Device[]> {
    throw new Error('Method not implemented.');
  }
  updateDevice(account_id: number, device: Device): Promise<Device> {
    throw new Error('Method not implemented.');
  }
  deleteDeviceByDeviceID(account_id: number, device_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
