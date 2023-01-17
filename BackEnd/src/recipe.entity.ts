import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsString, OneToMany } from 'class-validator';
import { Account } from './account.entity.ts';
import { RecipeIngredient } from './recipe-ingredient.entity.ts';

@Entity({ name: 'recipe' })
export class Recipe {
  @PrimaryGeneratedColumn()
  recipe_id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  recipe_name: string;

  @Column()
  @IsString()
  recipe_desc: string;

  @Column()
  recipe_use_count: number;

  @OneToMany()
  recipe_ingredient: Ingredient[];

}
