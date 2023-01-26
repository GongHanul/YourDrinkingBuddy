import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsServiceImpl } from './accounts.service.impl';
import { AccountsRepository } from './accounts.repository';
import { TypeOrmExModule } from './typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([AccountsRepository])],
  controllers: [AccountsController],
  providers: [AccountsServiceImpl, AccountsRepository],
  exports: [AccountsServiceImpl],
})
export class AccountsModule {}
