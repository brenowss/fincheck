import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class FindCategoryOrFailService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async find(userId: string, categoryId: string) {
    const category = await this.categoriesRepository.findOne({
      where: {
        id: categoryId,
        userId,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
