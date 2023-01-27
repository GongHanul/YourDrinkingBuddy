import { Module } from '@nestjs/common';
import { RecipesController } from './recipes.controller';
import { RecipesServiceImpl } from './recipes.service.impl';
import { TypeOrmExModule } from './typeorm-ex.module';
import { RecipesRepository } from './recipes.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecipesRepository])],
  controllers: [RecipesController],
  providers: [RecipesServiceImpl],
})
export class RecipesModule {}
