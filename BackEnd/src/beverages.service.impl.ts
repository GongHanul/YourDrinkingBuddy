import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BeveragesRepository } from './beverages.repository';
import { Beverage } from './beverage.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
import { BeveragesService } from './beverages.service';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import env from 'src/env/env.json';

const nameASC = { order: { name: 'ASC' } };
const nameDESC = { order: { name: 'DESC' } };
const idASC = { order: { beverage_id: 'ASC' } };
const idDESC = { order: { beverage_id: 'DESC' } };

@Injectable()
export class BeveragesServiceImpl implements BeveragesService {
  constructor(
    @InjectRepository(Beverage)
    private beveragesRepository: BeveragesRepository,
  ) {}
  async addBeverage(beverage: Beverage): Promise<Beverage> {
    if (!beverage.beverage_image_url) {
      beverage.beverage_image_url = env.noImageUrl;
    }
    const beverageInstance = this.beveragesRepository.create(beverage);
    await this.beveragesRepository.insert(beverageInstance);
    return beverageInstance;
  }
  async getBeverageByID(beverage_id: number): Promise<Beverage> {
    const result = this.beveragesRepository.findOneBy({ beverage_id });
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
  async getBeverages(pageno: number, pagesize: number, sort?: string, query?: string): Promise<Pagination<Beverage>> {
    let searchOption = undefined;
    if (sort) {
      switch (sort) {
        case 'name':
          searchOption = nameASC;
          break;
        case 'namedesc':
          searchOption = nameDESC;
          break;
        case 'new':
          searchOption = idASC;
          break;
        case 'old':
          searchOption = idDESC;
          break;
      }
    }
    if (query) {
      searchOption['where'] = { query: Like('%out%') };
    }
    return paginate<Beverage>(this.beveragesRepository, { page: pageno, limit: pagesize }, searchOption);
  }
  async getAllBeverage(): Promise<Beverage[]> {
    return this.beveragesRepository.find();
  }
  async updateBeverage(beverage: Beverage): Promise<Beverage> {
    const result = await this.beveragesRepository.update({ beverage_id: beverage.beverage_id }, { beverage_name: beverage.beverage_name, beverage_image_url: beverage.beverage_image_url });
    if (result.affected > 0) {
      return this.getBeverageByID(beverage.beverage_id);
    }
    throw new BadRequestException();
  }
  async deleteBeverage(beverage_id: number): Promise<void> {
    if ((await this.beveragesRepository.delete(beverage_id)).affected == 0) {
      throw new NotFoundException();
    }
  }
}
