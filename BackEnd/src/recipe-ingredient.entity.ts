import { Recipe } from './recipe.entity.ts';
import { Entity, Column } from 'typeorm';
import { IsNotEmpty, IsPositive, ManyToOne } from 'class-validator';

@Entity({ name: 'recipe_ingredient' })
export class RecipeIngredient {
  @ManyToOne(()=> Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;

  @Column()
  beverage_id: number;

  @IsNotEmpty()
  @IsPositive()
  @Column()
  recipe_ingredient_ratio: number;
}
