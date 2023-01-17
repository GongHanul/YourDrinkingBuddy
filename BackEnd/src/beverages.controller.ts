import {
  Controller,
  Get,
  Param,
  Query,
  Put,
  Body,
  Post,
  Delete,
  Inject,
} from '@nestjs/common';
import { Beverage } from './beverage.entity';
import { BeveragesService } from './beverages.service';
import { BeveragesServiceImpl } from './beverages.service.impl';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('beverage')
export class BeveragesController {
  @Inject(BeveragesServiceImpl)
  beveragesService: BeveragesService;

  @Get()
  async findAllWithPagination(
    @Query('pageno') pageno: number,
    @Query('pagesize') pagesize: number,
    @Query('sort') sort: string,
  ): Promise<Pagination<Beverage>> {
    return this.beveragesService.getBeverages(pageno, pagesize, sort);
  }

  @Get(':beverage_id')
  async getOne(@Param('beverage_id') beverage_id: number): Promise<Beverage> {
    return this.beveragesService.getBeverageByID(beverage_id);
  }

  @Post()
  async createOne(@Body() beverage: Beverage): Promise<Beverage> {
    return this.beveragesService.addBeverage(beverage);
  }

  @Put()
  async updateOne(@Body() dto: Beverage): Promise<Beverage> {
    return this.beveragesService.updateBeverage(dto);
  }

  @Delete(':beverage_id')
  async deleteOne(@Param('beverage_id') beverage_id: number) {
    await this.beveragesService.deleteBeverage(beverage_id);
  }
}
