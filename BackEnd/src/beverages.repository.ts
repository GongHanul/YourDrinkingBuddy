import { Repository } from 'typeorm';
import { Beverage } from './beverage.entity';

export class BeveragesRepository extends Repository<Beverage> {}
