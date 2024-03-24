import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { FindCategoryOrFailService } from './services/find-category-or-fail.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, FindCategoryOrFailService],
  exports: [FindCategoryOrFailService],
})
export class CategoriesModule {}
