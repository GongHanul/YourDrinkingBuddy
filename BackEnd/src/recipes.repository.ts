import { FindManyOptions, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(Recipe)
export class RecipesRepository extends Repository<Recipe> {
  // filter를 진부분집합으로 가지는 recipe를 가져온다.
  // filter:[1,3] 이면, recipe=[1,2,3] 인 recipe가 포함 될 수 있다.
  async findAllContainsFilter(pageno: number, pagesize: number, searchOption?: FindManyOptions, filter?: number[]): Promise<Pagination<Recipe>> {
    let query = this.createQueryBuilder('recipe').leftJoinAndSelect('recipe.ingredients', 'recipe_ingredient');
    if (filter) {
      const subQuery = this.createQueryBuilder('recipe')
        .subQuery()
        .select('recipe_id')
        .from('recipe_ingredient', 'r')
        .where('beverage_id in(:...filter)')
        .addSelect('count(*) as cnt')
        .groupBy('recipe_id')
        .having('cnt = :filterSize')
        .getQuery();
      query = query.where(`recipe.recipe_id in (SELECT recipe_id from ${subQuery} sq)`).setParameter('filter', filter).setParameter('filterSize', filter.length);
    }
    if (searchOption) {
      query = query.setFindOptions(searchOption);
    }
    return paginate<Recipe>(query, { page: pageno, limit: pagesize });
  }

  // recipe를 진부분집합으로 가지는 filter를 가져온다.
  // filter:[1,2,3,4] 이면, recipe=[1,4] 인 recipe가 포함 될 수 있다.
  async findAllFilterContains(pageno: number, pagesize: number, searchOption?: FindManyOptions, filter?: number[]): Promise<Pagination<Recipe>> {
    let query = this.createQueryBuilder('recipe').leftJoinAndSelect('recipe.ingredients', 'recipe_ingredient');
    if (filter) {
      const subQuery = this.createQueryBuilder('recipe').subQuery().select('recipe_id').from('recipe_ingredient', 'r').where('beverage_id not in(:...filter)').getQuery();
      query = query.where(`recipe.recipe_id not in (SELECT recipe_id from ${subQuery} sq)`).setParameter('filter', filter).setParameter('filterSize', filter.length);
    }
    if (searchOption) {
      query = query.setFindOptions(searchOption);
    }
    return paginate<Recipe>(query, { page: pageno, limit: pagesize });
  }
}
