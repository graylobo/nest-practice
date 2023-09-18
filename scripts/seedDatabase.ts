import { Category } from 'src/entity/category.entity';
import { OptionValue } from 'src/entity/optionvalue.entity';
import { Option } from 'src/entity/option.entity';
import { AppDataSource } from 'libs/database/src/app-data-source';

async function seedDatabase() {
  console.log('나 ㅅ힐행됨');
  // 카테고리 생성 및 저장
  const clothingCategory = new Category();
  clothingCategory.name = '의류';
  await AppDataSource.manager.save(clothingCategory);

  const shoeCategory = new Category();
  shoeCategory.name = '신발';
  await AppDataSource.manager.save(shoeCategory);

  // 옵션 생성 및 저장
  const sizeOption = new Option();
  sizeOption.name = '사이즈';
  await AppDataSource.manager.save(sizeOption);

  // 옵션 값 생성 및 저장 (의류)
  const largeValue = new OptionValue();
  largeValue.value = 'L';
  largeValue.option = sizeOption;
  await AppDataSource.manager.save(largeValue);

  const mediumValue = new OptionValue();
  mediumValue.value = 'M';
  mediumValue.option = sizeOption;
  await AppDataSource.manager.save(mediumValue);

  // 옵션 값 생성 및 저장 (신발)
  const mm230Value = new OptionValue();
  mm230Value.value = '230mm';
  mm230Value.option = sizeOption;
  await AppDataSource.manager.save(mm230Value);

  const mm240Value = new OptionValue();
  mm240Value.value = '240mm';
  mm240Value.option = sizeOption;
  await AppDataSource.manager.save(mm240Value);

  // 옵션과 카테고리 연결
  sizeOption.categories = [clothingCategory, shoeCategory];
  await AppDataSource.manager.save(sizeOption);
}

// 위의 함수를 실행하면 데이터베이스에 원하는 값이 삽입됩니다.
seedDatabase();

export { seedDatabase };
