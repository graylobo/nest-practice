import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { ExcelService } from 'libs/excel/src';
import * as path from 'path';
import {
  Add,
  AseanTariff,
  Basic,
  HScode,
  Origin,
  StandardTariff,
  Year,
} from 'src/entity';
import { HsCodeName } from 'src/entity/hscode-name.entity';
import { HSCodeOrigin } from 'src/entity/hscode-origin.entity';
import { CreateHscodeDto } from './dto/create-hscode.dto';
import { HscodeService } from './hscode.service';
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

  @Get('join')
  async joinTest() {
    const query = AppDataSource.manager.createQueryBuilder(HScode, 'hscode');
    query.leftJoinAndSelect('hscode.origin', 'origin');

    query.andWhere('origin.value = :value', { value: 'KR' });
    const [data] = await query.getMany();
    console.log('test', data);
  }

  @Get('findWithQuery')
  async findWithBuildQuery() {
    const qb = AppDataSource.manager.createQueryBuilder(HScode, 'hscode');

    const result = await qb

      .leftJoinAndSelect('hscode.origin', 'origin')
      .leftJoinAndSelect('hscode.add', 'add')
      .leftJoinAndSelect('hscode.name', 'name')
      .leftJoinAndSelect('hscode.basic', 'basic')
      .leftJoinAndSelect('hscode.standardTariff', 'standardTariff')
      .leftJoinAndSelect('hscode.aseanTariff', 'aseanTariff')
      .leftJoinAndSelect('hscode.year', 'year')
      .select([
        'hscode.value',
        'origin.value',
        'add.value',
        'name.korean',
        'name.english',
        'basic.value',
        'standardTariff.value',
        'aseanTariff.value',
        'year.value',
      ])
      .getMany();

    return result;
  }

  @Get('find')
  async find() {
    const originId = await AppDataSource.manager.find(HScode, {
      select: ['value'], // HScode에서 가져올 필드를 지정
      relations: [
        'origin',
        'add',
        'name',
        'basic',
        'standardTariff',
        'aseanTariff',
        'year',
      ],
      join: {
        alias: 'hscode',
        leftJoinAndSelect: {
          origin: 'hscode.origin',
          add: 'hscode.add',
          name: 'hscode.name',
          basic: 'hscode.basic',
          standardTariff: 'hscode.standardTariff',
          aseanTariff: 'hscode.aseanTariff',
          year: 'hscode.year',
        },
      },
    });

    // 각 관계의 id 필드를 제거
    originId.forEach((item) => {
      delete item.origin.originId;
      delete item.add.id;
      delete item.name.id;
      delete item.basic.id;
      delete item.standardTariff.id;
      delete item.aseanTariff.id;
      delete item.year.id;
    });

    return originId;
  }

  @Get('insert/hscode')
  async insertHscode() {
    const filePath = path.join('./', 'hscode.xlsx');
    const test = this.excelService.readExcelFile(filePath);

    let count = 0;

    for (const elem of test) {
      try {
        if (count === 0) {
          count++;
          continue;
        }
        const originId = await AppDataSource.manager.findOne(Origin, {
          where: { value: elem[0] },
        });
        const basicId = await AppDataSource.manager.findOne(Basic, {
          where: { value: elem[1] },
        });
        const addId = await AppDataSource.manager.findOne(Add, {
          where: { value: elem[2] },
        });
        const yearId = await AppDataSource.manager.findOne(Year, {
          where: { value: elem[3] },
        });
        const hscodeNameId = await AppDataSource.manager.findOne(HsCodeName, {
          where: { korean: elem[5] },
        });
        const standardTariffId = await AppDataSource.manager.findOne(
          StandardTariff,
          {
            where: { value: elem[7] },
          },
        );
        const aseanTariffId = await AppDataSource.manager.findOne(AseanTariff, {
          where: { value: elem[8] },
        });

        const hscode = new HScode();
        hscode.value = elem[4];
        hscode.origin = originId;
        hscode.basic = basicId;
        hscode.add = addId;
        hscode.name = hscodeNameId;
        hscode.standardTariff = standardTariffId;
        hscode.aseanTariff = aseanTariffId;
        hscode.year = yearId;

        await AppDataSource.manager.save(hscode);
        count++;
      } catch (error) {
        console.log('에라', error);
      }
    }

    return '완료됨' + count;
  }

  @Get('insert')
  async insertOthers() {
    const filePath = path.join('./', 'hscode.xlsx');
    const test = this.excelService.readExcelFile(filePath);
    test.forEach(async (elem) => {
      const hscode = await AppDataSource.manager.findOne(HsCodeName, {
        where: { korean: elem[5] },
      });

      if (hscode) {
        hscode.english = elem[6];
        await AppDataSource.manager.save(hscode);
      }
    });

    return '완료';
  }

  @Get('excel')
  getExcelData() {
    const filePath = path.join('./', 'hscode.xlsx');
    const hscodeDatas = this.excelService.readExcelFile(filePath);
    const originSet = new Set();
    const basicSet = new Set();
    const addSet = new Set();
    const yearSet = new Set();
    const koreanSet = new Set();
    const englishSet = new Set();
    const basicTarrifSet = new Set();
    const aseanTarrifSet = new Set();

    let count = 0;

    for (const hscode of hscodeDatas) {
      if (count === 0) {
        count = 1;
        continue;
      }
      originSet.add(hscode[0]);
      basicSet.add(hscode[1]);
      addSet.add(hscode[2]);
      yearSet.add(hscode[3]);
      koreanSet.add(hscode[5]);
      englishSet.add(hscode[6]);
      basicTarrifSet.add(hscode[7]);
      aseanTarrifSet.add(hscode[8]);
    }

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
    AppDataSource.manager.save(HsCodeName, koreanSetRes);
    AppDataSource.manager.save(StandardTariff, basicTarrifSetRes);
    AppDataSource.manager.save(AseanTariff, aseanTarrifSetRes);

    return 'asdasd';
  }

  @Get('excelorigin')
  async getExcelDataWithOrigin() {
    const filePath = path.join('./', 'hscode.xlsx');
    const test = this.excelService.readExcelFile(filePath);

    const result = [];

    let count = 0;
    for (const elem of test) {
      if (count === 0) {
        count++;
        continue;
      }
      const origin = elem[0];
      const basic = elem[1];
      const add = elem[2];
      const year = elem[3];
      const value = elem[4];
      const korean = elem[5];
      const english = elem[6];
      const standardTariff = elem[7];
      const aseanTariff = elem[8];
      const res = {
        origin,
        basic,
        add,
        year,
        korean,
        english,
        standardTariff,
        value,
        aseanTariff,
      };

      result.push(res);
    }

    const batchSize = 1000;
    const batchCount = Math.ceil(result.length / batchSize);

    for (let i = 0; i < batchCount; i++) {
      const batchItems = result.slice(i * batchSize, (i + 1) * batchSize);
      await AppDataSource.manager.save(HSCodeOrigin, batchItems);
    }
    return '삽입완료';
  }
}
