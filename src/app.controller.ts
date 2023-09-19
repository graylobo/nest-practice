import {
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { Category } from './entity/category.entity';
import { Option } from './entity/option.entity';
import { OptionValue } from './entity/optionvalue.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  private optionRepository: Repository<Option> =
    AppDataSource.getRepository(Option);
  private optionValueRepository: Repository<OptionValue> =
    AppDataSource.getRepository(OptionValue);

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/insert')
  async categoryInsert() {
    try {
      await seedDatabase();
    } catch (error) {
      handleDatabaseError(error);
    }
  }

  @Get('/options-by-category/:categoryName')
  async getOptionsByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<any> {
    const category = await this.categoryRepository.findOne({
      where: { name: categoryName },
      relations: ['options'],
    });

    console.log('cate', category);
    if (!category) {
      throw new NotFoundException(
        `카테고리 ${categoryName}이(가) 존재하지 않습니다1.`,
      );
    }

    return category;
  }
}

async function createCategory(name: string): Promise<Category> {
  const category = new Category();
  category.name = name;
  await AppDataSource.manager.save(category);
  return category;
}

async function seedDatabase() {
  const category1 = await createCategory('카테고리1');
  const category2 = await createCategory('카테고리2');
  const category3 = await createCategory('카테고리3');

  console.log('드루');
  const option1 = await createOption('옵션1');
  const option2 = await createOption('옵션2');
  const option3 = await createOption('옵션3');
  console.log('드루2');

  // 카테고리1 선택시= 옵션1, 옵션2 선택가능
  await linkCategoryToOption(category1, [option1, option2]);
  console.log('드루3');
  console.log('드루4');

  // 카테고리2 선택시 = 옵션2, 옵션3 선택가능
  await linkCategoryToOption(category2, [option2, option3]);
  console.log('드루5');

  // 카테고리3 선택시 =옵션1, 옵션3 선택가능
  await linkCategoryToOption(category3, [option1, option3]);
  console.log('드루6');
}
async function createOption(name: string): Promise<Option> {
  const option = new Option();
  option.name = name;
  await AppDataSource.manager.save(option);

  return option;
}

async function linkCategoryToOption(category: Category, options: Option[]) {
  if (!category.options) category.options = [];

  options.forEach((option) => {
    category.options.push(option);
  });

  await AppDataSource.manager.save(category);
}

function handleDatabaseError(error: any) {
  console.log(error);
  if (error.code === '23505') {
    // Unique Constraint violation in PostgreSQL
    throw new ConflictException('중복된 데이터입니다.11!');
  }
  throw new InternalServerErrorException(
    '데이터 삽입 중 오류가 발생했습니다..1',
  );
}
