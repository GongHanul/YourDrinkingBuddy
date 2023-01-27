import { Recipe } from './recipe.entity';
import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity({ name: 'recipe_ingredient' })
export class RecipeIngredient {
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'recipe_id' })
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
