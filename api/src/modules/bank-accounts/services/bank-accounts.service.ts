import { Injectable } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repository';
import { $Enums } from '@prisma/client';
import { FindBankAccountOrFailService } from './find-bank-account-or-fail.service';

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

  findAllByUserId(userId: string) {
    return this.bankAccountsRepository.findMany({
      where: { userId },
    });
  }

  async findOne(bankAccountId: string, userId: string) {
    const bankAccount = await this.findBankAccountOrFailService.find(
      userId,
      bankAccountId,
    );

    return bankAccount;
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
}
