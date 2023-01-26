import { Module } from '@nestjs/common';
import { Recipe } from './recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesServiceImpl } from './recipes.service.impl';
import { RecipeIngredient } from './recipe-ingredient.entity';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([Recipe, RecipeIngredient])],
  controllers: [RecipesController],
  providers: [RecipesServiceImpl],
})
export class RecipesModule {}
