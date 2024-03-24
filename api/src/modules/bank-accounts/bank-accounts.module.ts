import { Module } from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { BankAccountsController } from './bank-accounts.controller';
import { FindBankAccountOrFailService } from './services/find-bank-account-or-fail.service';

@Module({
  controllers: [BankAccountsController],
  providers: [BankAccountsService, FindBankAccountOrFailService],
  exports: [FindBankAccountOrFailService],
})
export class BankAccountsModule {}
