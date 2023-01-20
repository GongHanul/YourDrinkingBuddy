import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountsController } from './accounts.controller';
import { AccountsServiceImpl } from './accounts.service.impl';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Account]), AuthModule],
  controllers: [AccountsController],
  providers: [AccountsServiceImpl],
})
export class AccountsModule {}
