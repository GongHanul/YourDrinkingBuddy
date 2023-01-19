import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipesService } from './recipes.service';
import { RecipesRepository } from './recipes.repository';
import { Recipe } from './recipe.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Like } from 'typeorm';

const nameASC = { order: { name: 'ASC' } };
const nameDESC = { order: { name: 'DESC' } };
const idASC = { order: { beverage_id: 'ASC' } };
const idDESC = { order: { beverage_id: 'DESC' } };
const useCountASC = { order: { recipe_use_count: 'ASC' } };
const useCountDESC = { order: { recipe_use_count: 'DESC' } };

@Injectable()
export class RecipesServiceImpl implements RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipesRepository: RecipesRepository,
  ) {}
  async addUseCount(recipe_id: number): Promise<Recipe> {
    const recipeInstance = await this.recipesRepository.findOneBy({ recipe_id });
    if (recipeInstance) {
      throw new NotFoundException();
    }
    this.recipesRepository.update(recipe_id, { recipe_use_count: recipeInstance.recipe_use_count + 1 });
    return recipeInstance;
  }
  async getRecipeByRecipeID(recipe_id: number): Promise<Recipe> {
    // recipeID를 통해 호출시 ingredient 다 넣어서 준다.
    // 일단은 eager fetch로 가져온다.
    // lazy인지 eager인지 꼭 확인한다.
    return this.recipesRepository.findOneOrFail({ where: { recipe_id } });
  }
  async getRecipes(pageno: number, pagesize: number, filter?: number[], query?: string, sort?: string): Promise<Pagination<Recipe>> {
    // 필터 search 옵션을 구성한다.
    let searchOption = undefined;
    if (sort) {
      switch (sort) {
        case 'name':
          searchOption = nameASC;
          break;
        case 'namedesc':
          searchOption = nameDESC;
          break;
        case 'new':
          searchOption = idASC;
          break;
        case 'old':
          searchOption = idDESC;
          break;
        case 'use':
          searchOption = useCountASC;
          break;
        case 'usedesc':
          searchOption = useCountDESC;
          break;
      }
    }
    if (query) {
      searchOption['where'] = { recipe_name: Like(`%${query}%`) };
    }
    // filter를 이용하여 필터링 한 결과를 pagination 형태로 내놓는다.
    return this.recipesRepository.findAllContainsFilter(pageno, pagesize, searchOption, filter);
  }
  async getAllRecipe(): Promise<Recipe[]> {
    // 그냥 호출시 ingredient 다 넣지말고 가져온다.
    return this.recipesRepository.find();
  }
  async addRecipe(recipe: Recipe): Promise<Recipe> {
    const recipeInstance = this.recipesRepository.create(recipe);
    this.recipesRepository.insert(recipeInstance);
    return recipeInstance;
  }
  async updateRecipe(recipe: Recipe): Promise<Recipe> {
    const result = await this.recipesRepository.update({ recipe_id: recipe.recipe_id }, recipe);
    if (result.affected == 0) {
      throw new BadRequestException();
    }
    return this.getRecipeByRecipeID(recipe.recipe_id);
  }
  async deleteRecipe(recipe_id: number): Promise<void> {
    if ((await this.recipesRepository.delete(recipe_id)).affected == 0) {
      throw new NotFoundException();
    }
  }
}
