import { Beverage } from './beverage.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
export interface BeveragesService {
  addBeverage(beverage: Beverage): Promise<Beverage>;
  getBeverageByID(beverage_id: number): Promise<Beverage>;
  getBeverages(
    pageno: number,
    pagesize: number,
    priority?: string,
  ): Promise<Pagination<Beverage>>;
  getAllBeverage(): Promise<Beverage[]>;
  updateBeverage(beverage: Beverage): Promise<Beverage>;
  deleteBeverage(beverage_id: number): Promise<void>;
}
