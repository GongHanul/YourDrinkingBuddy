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
  async getAll(@Query('pageno') pageno?: number, @Query('pagesize') pagesize?: number, @Query('sort') sort?: string, @Query('query') query?: string): Promise<Pagination<Beverage>> {
    return this.beveragesService.getBeverages(pageno ? pageno : 1, pagesize ? pagesize : 10, sort, query);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Beverage> {
    return this.beveragesService.getBeverageByID(id);
  }

  @Post()
  async post(@Body() dto: Beverage): Promise<Beverage> {
    return this.beveragesService.addBeverage(dto);
  }

  @Put()
  async put(@Body() dto: Beverage): Promise<Beverage> {
    return this.beveragesService.updateBeverage(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.beveragesService.deleteBeverage(id);
  }
}
