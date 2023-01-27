import { Repository } from 'typeorm';
import { Beverage } from './beverage.entity';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(Beverage)
export class BeveragesRepository extends Repository<Beverage> {}
