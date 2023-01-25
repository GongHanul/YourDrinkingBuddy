import { Repository } from 'typeorm';
import { Beverage } from './beverage.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BeveragesRepository extends Repository<Beverage> {}
