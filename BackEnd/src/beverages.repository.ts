import { Repository } from 'typeorm';
import { Beverage } from './beverage.entity';

export interface BeveragesRepository extends Repository<Beverage> {}
