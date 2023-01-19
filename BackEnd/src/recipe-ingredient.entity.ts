import { Recipe } from './recipe.entity';
import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity({ name: 'recipe_ingredient' })
export class RecipeIngredient {
  
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  recipe: Recipe;

  @PrimaryColumn()
  recipe_id: number;

  @PrimaryColumn()
  beverage_id: number;

  @IsNotEmpty()
  @IsPositive()
  @Column()
  recipe_ingredient_ratio: number;
}
