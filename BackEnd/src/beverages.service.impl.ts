import { Injectable } from '@nestjs/common';
import { BeveragesRepository } from './beverages.repository';
import { Beverage } from './beverage.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
  addBeverage(beverage: Beverage): Promise<Beverage> {
    if (!beverage.beverage_image_url) {
      beverage.beverage_image_url = env.noImageUrl;
    }
    return this.beveragesRepository.save(beverage);
  }
  getBeverageByID(beverage_id: number): Promise<Beverage> {
    return this.beveragesRepository.findOneBy({ beverage_id });
  }
  getBeverages(
    pageno: number,
    pagesize: number,
    priority?: string,
  ): Promise<Pagination<Beverage>> {
    let searchOption = null;
    if (priority) {
      switch (priority) {
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
    return paginate<Beverage>(
      this.beveragesRepository,
      { page: pageno, limit: pagesize },
      searchOption,
    );
  }
  getAllBeverage(): Promise<Beverage[]> {
    return this.beveragesRepository.find();
  }
  updateBeverage(beverage: Beverage): Promise<Beverage> {
    return this.beveragesRepository.save(beverage);
  }
  async deleteBeverage(beverage_id: number): Promise<void> {
    await this.beveragesRepository.delete(beverage_id);
  }
}
