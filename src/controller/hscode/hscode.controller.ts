import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateHscodeDto } from './dto/create-hscode.dto';
import { HscodeService } from './hscode.service';
import { AppDataSource } from 'libs/database/src/app-data-source';
import {
  Add,
  AseanTariff,
  Basic,
  Origin,
  StandardTariff,
  Year,
} from 'src/entity';
import { ExcelService } from 'libs/excel/src';
import * as path from 'path';
import { HsCodeName } from 'src/entity/hscode-name.entity';
@Controller('hscode')
export class HscodeController {
  constructor(
    private readonly hscodeService: HscodeService,
    private readonly excelService: ExcelService,
  ) {}

  @Post()
  create(@Body() createHscodeDto: CreateHscodeDto) {
    return this.hscodeService.create(createHscodeDto);
  }

  @Get('insert')
  insertOthers() {
    AppDataSource.manager.save(Add, { value: '9000' }); //인자: 엔티티 클래스, 적용할 데이터
    AppDataSource.manager.save(Year, { value: '2022' }); //인자: 엔티티 클래스, 적용할 데이터

    return '완료';
  }

  @Get('excel')
  getExcelData() {
    const filePath = path.join('./', 'hscode.xlsx');
    const test = this.excelService.readExcelFile(filePath);
    const originSet = new Set();
    const basicSet = new Set();
    const addSet = new Set();
    const yearSet = new Set();
    const koreanSet = new Set();
    const englishSet = new Set();
    const basicTarrifSet = new Set();
    const aseanTarrifSet = new Set();

    test.forEach((elem) => {
      originSet.add(elem[0]);
      basicSet.add(elem[1]);
      addSet.add(elem[2]);
      yearSet.add(elem[3]);
      koreanSet.add(elem[5]);
      englishSet.add(elem[6]);
      basicTarrifSet.add(elem[7]);
      aseanTarrifSet.add(elem[8]);
    });

    const originSetRes = Array.from(originSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({ value }));
    const basicSetRes = Array.from(basicSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({ value }));
    const addSetRes = Array.from(addSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({ value }));
    const yearSetRes = Array.from(yearSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({ value }));
    const koreanSetRes = Array.from(koreanSet)
      .filter((e) => e !== null && e !== undefined)
      .map((korean: any) => ({
        korean: korean ? korean : '',
      }));
    const englishSetRes = Array.from(englishSet)
      .filter((e) => e !== null && e !== undefined)
      .map((english: any) => ({
        english: english ? english : '',
      }));
    const basicTarrifSetRes = Array.from(basicTarrifSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({
        value,
      }));
    const aseanTarrifSetRes = Array.from(aseanTarrifSet)
      .filter((e) => e !== null && e !== undefined)
      .map((value: any) => ({
        value,
      }));

    const combinedArray = [];

    for (let i = 0; i < koreanSetRes.length; i++) {
      combinedArray.push({ ...koreanSetRes[i], ...englishSetRes[i] });
    }

    console.log('originSetRes', originSetRes);

    AppDataSource.manager.save(Origin, originSetRes);
    AppDataSource.manager.save(Basic, basicSetRes);
    AppDataSource.manager.save(Add, addSetRes);
    AppDataSource.manager.save(Year, yearSetRes);
    AppDataSource.manager.save(HsCodeName, combinedArray);
    AppDataSource.manager.save(StandardTariff, basicTarrifSetRes);
    AppDataSource.manager.save(AseanTariff, aseanTarrifSetRes);

    return 'finishssasdzzz';
  }
}
