import { Controller, Get, Param, Query, Put, Body, Post, Delete, Inject, HttpCode } from '@nestjs/common';
import { Beverage } from './beverage.entity';
import { BeveragesService } from './beverages.service';
import { BeveragesServiceImpl } from './beverages.service.impl';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ParseIntPipe } from '@nestjs/common';

@Controller('beverage')
export class BeveragesController {
  @Inject(BeveragesServiceImpl)
  beveragesService: BeveragesService;

  @Get()
  async findAllWithPagination(@Query('pageno') pageno?: number, @Query('pagesize') pagesize?: number, @Query('sort') sort?: string, @Query('query') query?: string): Promise<Pagination<Beverage>> {
    return this.beveragesService.getBeverages(pageno ? pageno : 1, pagesize ? pagesize : 10, sort, query);
  }

  @Get(':beverage_id')
  async getOne(@Param('beverage_id', ParseIntPipe) beverage_id: number): Promise<Beverage> {
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
  @HttpCode(204)
  async deleteOne(@Param('beverage_id', ParseIntPipe) beverage_id: number) {
    await this.beveragesService.deleteBeverage(beverage_id);
  }
}
