import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

export class RecipesRepository extends Repository<Recipe> {}
