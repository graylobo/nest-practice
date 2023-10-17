import { Controller, Get } from '@nestjs/common';
import { ExcelService } from 'libs/excel/src';
import { HscodeService } from './hscode.service';
import { Country } from 'src/entity';
import { AppDataSource } from 'libs/database/src/app-data-source';
@Controller('hscode')
export class HscodeController {
  constructor(
    private readonly hscodeService: HscodeService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('/insert/active-record')
  async activeRecordInsert() {
    const country = new Country();
    country.name = '한국임';
    // country.save();
    return '완료';
  }

  @Get('/insert/data-mapper')
  async dataMapperInsert() {
    const CountryRepo = AppDataSource.getRepository(Country);
    const country = new Country();
    country.name = '한국임';
    CountryRepo.save(country);
    return '완료';
  }
}
