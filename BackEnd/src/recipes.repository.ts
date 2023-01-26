import { FindManyOptions, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Injectable } from '@nestjs/common';
import { CustomRepository } from './typeorm-ex.decorator';

@Injectable()
@CustomRepository(Recipe)
export class RecipesRepository extends Repository<Recipe> {
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
      query = query.andWhere(searchOption);
    }
    return paginate<Recipe>(query, { page: pageno, limit: pagesize });
  }
}
