import { Device } from './device.entity';

export interface DevicesService {
  addDevice(account_id: number, device: Device): Promise<Device>;
  getDeviceByDeviceID(account_id: number, device_id: string): Promise<Device>;
  getAllDevices(account_id: number, query?: string): Promise<Device[]>;
  updateDevice(account_id: number, device: Device): Promise<Device>;
  deleteDeviceByDeviceID(account_id: number, device_id: string): Promise<void>;
}
