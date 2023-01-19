import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesServiceImpl } from './recipes.service.impl';
import { RecipeIngredient } from './recipe-ingredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeIngredient])],
  controllers: [RecipesController],
  providers: [RecipesServiceImpl],
})
export class RecipesModule {}
