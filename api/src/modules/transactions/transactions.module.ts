import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './transactions.controller';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { FindCategoryOrFailService } from '../categories/services/find-category-or-fail.service';
import { FindBankAccountOrFailService } from '../bank-accounts/services/find-bank-account-or-fail.service';
import { FindTransactionOrFailService } from './services/find-transaction-or-fail.service';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    FindCategoryOrFailService,
    FindBankAccountOrFailService,
    FindTransactionOrFailService,
  ],
  imports: [BankAccountsModule],
})
export class TransactionsModule {}
