import { Body, Controller, Delete, Get, HttpCode, Inject, Param, Post, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesServiceImpl } from './devices.service.impl';
import { Device } from './device.entity';

@Controller('devices')
export class DevicesController {
  @Inject(DevicesServiceImpl)
  devicesService: DevicesService;

  @Get()
  async getAll(): Promise<Device[]> {
    return this.devicesService.getAllDevices(12345678);
  }

  @Get(':id')
  async get(@Param('id') device_mac_address: string): Promise<Device> {
    return this.devicesService.getDeviceByDeviceMacAddress(device_mac_address);
  }

  @Post()
  async post(@Body() dto: Device): Promise<Device> {
    return this.devicesService.addDevice(12345678, dto);
  }

  @Put()
  async put(@Body() dto: Device): Promise<Device> {
    return this.devicesService.updateDevice(12345678, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') device_mac_address: string) {
    await this.devicesService.deleteDevice(12345678, device_mac_address);
  }
}
