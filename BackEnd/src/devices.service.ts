import { Device } from './device.entity';

export interface DevicesService {
  addDevice(account_id: number, device: Device): Promise<Device>;
  getDeviceByDeviceMacAddress(device_mac_address: string): Promise<Device>;
  getAllDevices(account_id: number, query?: string): Promise<Device[]>;
  updateDevice(account_id: number, device: Device): Promise<Device>;
  deleteDevice(account_id: number, device_mac_address: string): Promise<void>;
}
