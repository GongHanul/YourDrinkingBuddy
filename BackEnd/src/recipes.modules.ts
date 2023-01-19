import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { RecipesController } from './recipes.controller';
import { RecipesServiceImpl } from './recipes.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipesServiceImpl],
})
export class RecipesModule {}
