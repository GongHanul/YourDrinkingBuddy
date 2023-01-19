import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsServiceImpl } from './accounts.service.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsServiceImpl],
})
export class AccountsModule {}
