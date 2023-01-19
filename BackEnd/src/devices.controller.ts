import { Body, Controller, Delete, Get, HttpCode, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesServiceImpl } from './devices.service.impl';
import { Device } from './device.entity';

@Controller('device')
export class DeviceController {
  @Inject(DevicesServiceImpl)
  devicesService: DevicesService;

  @Get()
  async getAll(): Promise<Device[]> {
    return this.devicesService.getAllDevices(12345678);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Device> {
    return this.devicesService.getDeviceByDeviceID(id);
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
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.devicesService.deleteDevice(12345678, id);
  }
}
