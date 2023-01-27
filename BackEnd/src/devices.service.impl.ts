import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesRepository } from './devices.repository';
import { Device } from './device.entity';

const responseSelect = { device_id: true, device_name: true, recipe_maker_ip: true, recipe_maker_port: true };

@Injectable()
export class DevicesServiceImpl implements DevicesService {
  constructor(private devicesRepository: DevicesRepository) {}
  async addDevice(account_id: number, device: Device): Promise<Device> {
    device.setAccount(account_id);
    const deviceInstance = this.devicesRepository.create(device);
    await this.devicesRepository.insert(deviceInstance);
    return deviceInstance;
  }
  async getDeviceByDeviceMacAddress(device_mac_address: string): Promise<Device> {
    return this.devicesRepository.findOne({ select: responseSelect, where: { device_mac_address: device_mac_address } });
  }
  async getAllDevices(account_id: number, query?: string): Promise<Device[]> {
    // 쿼리는 비어있으면 안 되므로, 빈 쿼리는 전체검사로 인식
    if (!query) {
      query = '';
    }
    return this.devicesRepository.findAllContainsName(query, account_id);
  }
  async updateDevice(account_id: number, device: Device): Promise<Device> {
    const device2 = await this.getDeviceByDeviceMacAddress(device.device_mac_address);
    // 디바이스 존재 검사
    if (!device2) {
      throw new NotFoundException();
    }
    // 디바이스 실 소유자 검사
    if (!device2.equalsAccount(account_id)) {
      throw new ForbiddenException();
    }
    // 소유자 판명되었으면 변경 진행
    return this.devicesRepository.save(device);
  }
  async deleteDevice(account_id: number, device_mac_address: string): Promise<void> {
    const device2 = await this.getDeviceByDeviceMacAddress(device_mac_address);
    // 디바이스 존재 검사
    if (!device2) {
      throw new NotFoundException();
    }
    // 디바이스 실 소유자 검사
    if (!device2.equalsAccount(account_id)) {
      throw new ForbiddenException();
    }
    // 소유자 판명되었으면 삭제 진행 삭제시 문제발생은 400이 아닌 500에러
    this.devicesRepository.delete(device_mac_address);
  }
}
