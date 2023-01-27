import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { RecipeIngredient } from './recipe-ingredient.entity';

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

  @OneToMany(() => RecipeIngredient, (ingredient) => ingredient.recipe, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinColumn({ name: 'recipe_id' })
  ingredients: RecipeIngredient[];
}
