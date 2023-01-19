import { FindManyOptions, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';

export class RecipesRepository extends Repository<Recipe> {
  async findAllContainsFilter(pageno: number, pagesize: number, searchOption?: FindManyOptions, filter?: number[]): Promise<Pagination<Recipe>> {
    const query = this.createQueryBuilder('recipe').leftJoinAndSelect('recipe.recipe_id', 'recipe_ingredient').where('beverage_id = all(:filter)', { filter: filter });
    return paginate<Recipe>(searchOption ? query.andWhere(searchOption) : query, { page: pageno, limit: pagesize });
  }
}
