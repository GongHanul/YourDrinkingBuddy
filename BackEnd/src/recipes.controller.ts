import { Controller, Get, Param, Query, Put, Body, Post, Delete, Inject, HttpCode, ParseArrayPipe } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { RecipesService } from './recipes.service';
import { RecipesServiceImpl } from './recipes.service.impl';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ParseIntPipe } from '@nestjs/common';

@Controller('recipes')
export class RecipesController {
  @Inject(RecipesServiceImpl)
  recipesService: RecipesService;

  @Get()
  async getAll(
    @Query('pageno') pageno?: number,
    @Query('pagesize') pagesize?: number,
    @Query('filter', new ParseArrayPipe({ items: Number, separator: ',', optional: true })) filter?: number[],
    @Query('query') query?: string,
    @Query('sort') sort?: string,
  ): Promise<Pagination<Recipe>> {
    return this.recipesService.getRecipes(pageno ? pageno : 1, pagesize ? pagesize : 10, filter, query, sort);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
    return this.recipesService.getRecipeByRecipeID(id);
  }

  @Post()
  async post(@Body() dto: Recipe): Promise<Recipe> {
    return this.recipesService.addRecipe(dto);
  }

  @Put()
  async put(@Body() dto: Recipe): Promise<Recipe> {
    return this.recipesService.updateRecipe(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.recipesService.deleteRecipe(id);
  }
}
