import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { $Enums } from '@prisma/client';
import { FindBankAccountOrFailService } from './find-bank-account-or-fail.service';

type Transaction = {
  id: string;
  value: number;
  type: $Enums.TransactionType;
};

@Injectable()
export class BankAccountsService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
    private readonly findBankAccountOrFailService: FindBankAccountOrFailService,
  ) {}

  create(
    @ActiveUserId() userId: string,
    createBankAccountDto: CreateBankAccountDto,
  ) {
    const { initialBalance, color, name, type } = createBankAccountDto;

    return this.bankAccountsRepository.create({
      data: {
        userId,
        initialBalance,
        color,
        name,
        type: type as $Enums.BankAccountType,
      },
    });
  }

  async findAllByUserId(userId: string) {
    const bankAccounts = await this.bankAccountsRepository.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            id: true,
            value: true,
            type: true,
          },
        },
      },
    });

    return bankAccounts.map((bankAccount) => ({
      ...bankAccount,
      currentBalance: this.calculateCurrentBalance(
        bankAccount.transactions,
        bankAccount.initialBalance,
      ),
    }));
  }

  async findOne(bankAccountId: string, userId: string) {
    const bankAccount = await this.findBankAccountOrFailService.find(
      userId,
      bankAccountId,
    );

    return {
      ...bankAccount,
      currentBalance: this.calculateCurrentBalance(
        bankAccount.transactions,
        bankAccount.initialBalance,
      ),
    };
  }

  async update(
    bankAccountId: string,
    userId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.findBankAccountOrFailService.find(userId, bankAccountId);

    const { initialBalance, color, name, type } = updateBankAccountDto;

    return this.bankAccountsRepository.update({
      where: { id: bankAccountId },
      data: {
        initialBalance,
        color,
        name,
        type: type as $Enums.BankAccountType,
      },
    });
  }

  async remove(bankAccountId: string, userId: string) {
    await this.findBankAccountOrFailService.find(userId, bankAccountId);

    await this.bankAccountsRepository.delete({
      where: { id: bankAccountId },
    });

    return null;
  }

  private calculateCurrentBalance(
    transactions: Transaction[],
    initialBalance: number,
  ): number {
    return transactions.reduce(
      (acc, transaction) =>
        transaction.type === 'INCOME'
          ? acc + transaction.value
          : acc - transaction.value,
      initialBalance,
    );
  }
}
