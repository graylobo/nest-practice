import {
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { Category } from './entity/category.entity';
import { Option } from './entity/option.entity';
import { OptionValue } from './entity/optionvalue.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
}

async function createCategory(name: string): Promise<Category> {
  const category = new Category();
  category.name = name;
  await AppDataSource.manager.save(category);
  return category;
}

async function createOptionValue(
  value: string,
  option: Option,
): Promise<OptionValue> {
  const optionValue = new OptionValue();
  optionValue.value = value;
  optionValue.option = option;
  await AppDataSource.manager.save(optionValue);
  return optionValue;
}

async function seedDatabase() {
  const clothingCategory = await createCategory('의류');

  const shoeCategory = await createCategory('신발');
  const sizeOption = new Option();
  sizeOption.name = '사이즈';
  await AppDataSource.manager.save(sizeOption);

  await createOptionValue('L', sizeOption);
  await createOptionValue('M', sizeOption);
  await createOptionValue('230mm', sizeOption);
  await createOptionValue('240mm', sizeOption);

  sizeOption.categories = [clothingCategory, shoeCategory];
  await AppDataSource.manager.save(sizeOption);
}

function handleDatabaseError(error: any) {
  if (error.code === '23505') {
    // Unique Constraint violation in PostgreSQL
    throw new ConflictException('중복된 데이터입니다.!');
  }
  throw new InternalServerErrorException('데이터 삽입 중 오류가 발생했습니다.');
}
