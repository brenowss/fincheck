import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repository';
import { FindBankAccountOrFailService } from '../../bank-accounts/services/find-bank-account-or-fail.service';
import { FindCategoryOrFailService } from '../../categories/services/find-category-or-fail.service';
import { FindTransactionOrFailService } from './find-transaction-or-fail.service';
import { TransactionType } from '../entities/Transaction';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly findBankAccountOrFailService: FindBankAccountOrFailService,
    private readonly findCategoryOrFailService: FindCategoryOrFailService,
    private readonly findTransactionOrFailService: FindTransactionOrFailService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: createTransactionDto.bankAccountId,
      categoryId: createTransactionDto.categoryId,
    });

    return this.transactionsRepository.create({
      data: {
        userId,
        ...createTransactionDto,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.transactionsRepository.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  findOne(id: string, userId: string) {
    return this.transactionsRepository.findOne({
      where: { id, userId },
    });
  }

  async update(
    userId: string,
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.validateEntitiesOwnership({
      userId,
      bankAccountId: updateTransactionDto.bankAccountId,
      categoryId: updateTransactionDto.categoryId,
      transactionId: id,
    });

    return this.transactionsRepository.update({
      where: { id, userId },
      data: updateTransactionDto,
    });
  }

  async remove(userId: string, id: string) {
    await this.validateEntitiesOwnership({
      userId,
      transactionId: id,
    });

    await this.transactionsRepository.delete({ where: { id } });

    return null;
  }

  private async validateEntitiesOwnership({
    bankAccountId,
    categoryId,
    userId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      bankAccountId &&
        this.findBankAccountOrFailService.find(userId, bankAccountId),
      categoryId && this.findCategoryOrFailService.find(userId, categoryId),
      transactionId &&
        this.findTransactionOrFailService.find(userId, transactionId),
    ]);

    return;
  }
}
