import { Recipe } from './recipe.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

export interface GamesService {
  addUseCount(recipe_id: number): Promise<Recipe>;
  getRecipeByRecipeID(recipe_id: number): Promise<Recipe>;
  getRecipes(pageno: number, pagesize: number, filter?:number, priority?: string): Promise<Pagination<Recipe>>;
  getAllRecipe(): Promise<Recipe[]>;
  addRecipe(recipe: Recipe): Promise<Recipe>;
  updateRecipe(recipe: Recipe): Promise<Recipe>;
  deleteRecipe(recipe_id: number): Promise<void>;
}

