import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ExcelService } from 'libs/excel/src';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { Category } from 'src/entity';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('insert')
  async createCate() {
    const categories = this.excelService.readExcelFile('category.xlsx');

    async function insertCategory(data: string[], parent?: Category) {
      const categoryName = data.shift(); // 첫 번째 카테고리 이름 가져오기

      // 부모 카테고리가 없는 경우 null로 설정
      const parentCondition = parent ? { id: parent.id } : null;

      // 같은 이름의 카테고리와 부모 카테고리를 기준으로 기존 카테고리 찾기
      let category = await AppDataSource.manager.findOne(Category, {
        where: { name: categoryName, parent: parentCondition },
      });

      if (!category) {
        category = AppDataSource.manager.create(Category, {
          name: categoryName,
          parent: parent,
        });
        await AppDataSource.manager.save(category);
      }

      if (data.length) {
        await insertCategory(data, category);
      }
    }

    for (const categoryLine of categories) {
      await insertCategory(categoryLine);
    }
    return '완료';
  }
}
