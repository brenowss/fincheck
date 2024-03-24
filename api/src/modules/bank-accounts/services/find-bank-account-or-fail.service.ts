import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';

@Injectable()
export class FindBankAccountOrFailService {
  constructor(
    private readonly bankAccountsRepository: BankAccountsRepository,
  ) {}

  async find(userId: string, bankAccountId: string) {
    const bankAccount = await this.bankAccountsRepository.findOne({
      where: {
        id: bankAccountId,
        userId,
      },
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

    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }

    return bankAccount;
  }
}
