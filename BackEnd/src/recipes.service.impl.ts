import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesService } from './recipes.service';
import { RecipesRepository } from './recipes.repository';
import { Recipe } from './recipe.entity';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';

@Injectable()
export class RecipesServiceImpl implements RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: RecipesRepository,
  ) {}
  addUseCount(recipe_id: number): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }
  getRecipeByRecipeID(recipe_id: number): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }
  getRecipes(pageno: number, pagesize: number, filter?: number[], priority?: string): Promise<Pagination<Recipe, IPaginationMeta>> {
    throw new Error('Method not implemented.');
  }
  getAllRecipe(): Promise<Recipe[]> {
    throw new Error('Method not implemented.');
  }
  addRecipe(recipe: Recipe): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }
  updateRecipe(recipe: Recipe): Promise<Recipe> {
    throw new Error('Method not implemented.');
  }
  deleteRecipe(recipe_id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
