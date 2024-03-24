import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BankAccountsService } from './services/bank-accounts.service';
import { CreateBankAccountDto } from './dto/create-bank-account.dto';
import { UpdateBankAccountDto } from './dto/update-bank-account.dto';
import { ActiveUserId } from 'src/shared/decorators/ActiveUserId';

@Controller('bank-accounts')
export class BankAccountsController {
  constructor(private readonly bankAccountsService: BankAccountsService) {}

  @Post()
  create(
    @Body() createBankAccountDto: CreateBankAccountDto,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.create(userId, createBankAccountDto);
  }

  @Get()
  findAll(@ActiveUserId() userId: string) {
    return this.bankAccountsService.findAllByUserId(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.findOne(id, userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUserId() userId: string,
    @Body() updateBankAccountDto: UpdateBankAccountDto,
  ) {
    return this.bankAccountsService.update(id, userId, updateBankAccountDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @ActiveUserId() userId: string,
  ) {
    return this.bankAccountsService.remove(id, userId);
  }
}
