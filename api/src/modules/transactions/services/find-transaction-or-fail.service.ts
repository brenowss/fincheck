import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';

@Injectable()
export class FindTransactionOrFailService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async find(userId: string, transactionId: string) {
    const transaction = await this.transactionsRepository.findOne({
      where: {
        id: transactionId,
        userId,
      },
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
