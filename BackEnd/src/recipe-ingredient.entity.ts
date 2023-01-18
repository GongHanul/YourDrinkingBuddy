import { Recipe } from './recipe.entity';
import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity({ name: 'recipe_ingredient' })
export class RecipeIngredient {
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;

  @Column()
  beverage_id: number;

  @IsNotEmpty()
  @IsPositive()
  @Column()
  recipe_ingredient_ratio: number;
}
