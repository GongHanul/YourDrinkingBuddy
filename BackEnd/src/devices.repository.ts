import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DevicesRepository extends Repository<Device> {
  async findAllContainsName(name: string, account_id: number): Promise<Device[]> {
    return this.createQueryBuilder('device') //.select(`device_mac_address,device_name,recipe_maker_ip,recipe_maker_port`)
      .select(`device_mac_address,device_name`)
      .where(`device_name LIKE '%:name%' `, { name })
      .andWhere(`account_id = :account_id`, { account_id })
      .getMany();
  }
}
