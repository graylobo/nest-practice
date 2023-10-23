import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ExcelModule } from 'libs/excel/src';

@Module({
  imports: [ExcelModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
