import {
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { Category } from './entity/category.entity';
import { Option } from './entity/option.entity';
import { OptionValue } from './entity/optionvalue.entity';
import { Repository } from 'typeorm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  private readonly optionRepository: Repository<Option> =
    AppDataSource.getRepository(Option);
  private readonly optionValueRepository: Repository<OptionValue> =
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

    if (!category) {
      throw new NotFoundException(
        `카테고리 ${categoryName}이(가) 존재하지 않습니다1.`,
      );
    }

    const optionsWithValues = await Promise.all(
      category.options.map(async (option) => {
        const optionValues = await this.optionValueRepository.find({
          where: { option: { id: option.id }, category: { id: category.id } },
        });
        return {
          optionName: option.name,
          optionValues: optionValues.map((ov) => ov.value),
        };
      }),
    );

    return optionsWithValues;
  }
}

async function createCategory(name: string): Promise<Category> {
  const category = new Category();
  category.name = name;
  await AppDataSource.manager.save(category);
  return category;
}

async function seedDatabase() {
  const clothingCategory = await createCategory('의류');
  const shoeCategory = await createCategory('신발');

  const sizeOption = new Option();
  sizeOption.name = '사이즈';
  await AppDataSource.manager.save(sizeOption);

  await createOptionValueForCategory('L', sizeOption, clothingCategory);
  await createOptionValueForCategory('M', sizeOption, clothingCategory);
  await createOptionValueForCategory('230mm', sizeOption, shoeCategory);
  await createOptionValueForCategory('240mm', sizeOption, shoeCategory);
}
async function createOptionValueForCategory(
  value: string,
  option: Option,
  category: Category,
): Promise<OptionValue> {
  const optionValue = new OptionValue();
  optionValue.value = value;
  optionValue.option = option;
  optionValue.category = category; // 이 줄을 추가합니다.
  await AppDataSource.manager.save(optionValue);

  if (!category.options) category.options = [];
  category.options.push(option);
  await AppDataSource.manager.save(category);

  return optionValue;
}
function handleDatabaseError(error: any) {
  if (error.code === '23505') {
    // Unique Constraint violation in PostgreSQL
    throw new ConflictException('중복된 데이터입니다.!');
  }
  throw new InternalServerErrorException(
    '데이터 삽입 중 오류가 발생했습니다1.',
  );
}
