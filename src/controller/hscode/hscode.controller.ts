import { Controller, Get, Query } from '@nestjs/common';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { ExcelService } from 'libs/excel/src';
import {
  AseanTariff,
  Country,
  HSCodeName,
  HSCodeOrigin,
  Hscode,
  StandardTariff,
} from 'src/entity';
import { HSCodeAddionalCode } from 'src/entity/hscode-additional-code.entity';
import { Year } from 'src/entity/year.entity';
import { GetHscodeReqDto } from './dto/get-hscode.req.dto';
import { HscodeService } from './hscode.service';
@Controller('hscode')
export class HscodeController {
  constructor(
    private readonly hscodeService: HscodeService,
    private readonly excelService: ExcelService,
  ) {}

  @Get('insert')
  async insertEtc() {
    const data = this.excelService.readExcelFile('hscode.xlsx');

    const countryCodeSet = new Set();
    const originCodeSet = new Set();
    const additionalCodeSet = new Set();
    const yearSet = new Set();
    const krNameSet = new Set();
    const enNameSet = new Set();
    const standardTariffSet = new Set();
    const aseanTariffeSet = new Set();

    for (let i = 1; i < data.length; i++) {
      if (data[i].length === 0) continue;
      const [
        countryCode,
        originCode,
        additionalCode,
        year,
        hscode,
        krName,
        enName,
        standardTariff,
        aseanTariff,
      ] = data[i];

      countryCodeSet.add(countryCode);
      originCodeSet.add(originCode);
      additionalCodeSet.add(additionalCode);
      yearSet.add(year);
      krNameSet.add(krName);
      enNameSet.add(enName);
      standardTariffSet.add(standardTariff);
      aseanTariffeSet.add(aseanTariff);
    }
    const countryCodeArray = Array.from(countryCodeSet).map((elem: any) => ({
      name: elem,
    }));
    const originCodeArray = Array.from(originCodeSet).map((elem: any) => ({
      code: elem,
    }));
    const additionalCodeArray = Array.from(additionalCodeSet).map(
      (elem: any) => ({
        code: elem,
      }),
    );
    const yearArray = Array.from(yearSet).map((elem: any) => ({
      year: elem,
    }));
    const hscodeNameArray = Array.from(krNameSet).map((elem: any) => ({
      korean: elem,
    }));
    const standardTariffArray = Array.from(standardTariffSet).map(
      (elem: any) => ({
        value: elem,
      }),
    );
    const aseanTariffArray = Array.from(aseanTariffeSet).map((elem: any) => ({
      value: elem,
    }));

    await AppDataSource.manager.save(Country, countryCodeArray);
    await AppDataSource.manager.save(HSCodeOrigin, originCodeArray);
    await AppDataSource.manager.save(HSCodeAddionalCode, additionalCodeArray);
    await AppDataSource.manager.save(Year, yearArray);
    await AppDataSource.manager.save(HSCodeName, hscodeNameArray);
    await AppDataSource.manager.save(StandardTariff, standardTariffArray);
    await AppDataSource.manager.save(AseanTariff, aseanTariffArray);
    return 'fin!!';
  }

  @Get('insert/hs')
  async insertHscode() {
    const data = this.excelService.readExcelFile('hscode.xlsx');
    for (let i = 1; i < data.length; i++) {
      const [
        countryCode,
        originCode,
        additionalCode,
        year,
        combinedCode,
        krName,
        enName,
        standardTariff,
        aseanTariff,
      ] = data[i];
      const resHscode = await AppDataSource.manager.findOne(Hscode, {
        where: { hscode: combinedCode },
      });

      if (!resHscode) {
        const resCountry = await AppDataSource.manager.findOne(Country, {
          where: { name: countryCode },
        });
        const resHSCodeOrigin = await AppDataSource.manager.findOne(
          HSCodeOrigin,
          { where: { code: originCode } },
        );
        const resHSCodeCountry = await AppDataSource.manager.findOne(
          HSCodeAddionalCode,
          { where: { code: additionalCode } },
        );
        const resYear = await AppDataSource.manager.findOne(Year, {
          where: { year },
        });
        const resHSCodeName = await AppDataSource.manager.findOne(HSCodeName, {
          where: { korean: krName },
        });
        const resStandardTariff = await AppDataSource.manager.findOne(
          StandardTariff,
          { where: { value: standardTariff } },
        );
        const resAseanTariff = await AppDataSource.manager.findOne(
          AseanTariff,
          {
            where: { value: aseanTariff },
          },
        );

        const hscode = new Hscode();
        hscode.hscode = combinedCode;
        hscode.country = resCountry;
        hscode.originCode = resHSCodeOrigin;
        hscode.additionalCode = resHSCodeCountry;
        hscode.year = resYear;
        hscode.name = resHSCodeName;
        hscode.standardTariff = resStandardTariff;
        hscode.aseanTariff = resAseanTariff;
        await AppDataSource.manager.save(hscode);
      }
    }
    return 'fin11';
  }

  @Get('find')
  async findHscode(@Query() params: GetHscodeReqDto) {
    let product = null;

    try {
      const query = AppDataSource.manager
        .createQueryBuilder(Hscode, 'hscode')
        .leftJoinAndSelect('hscode.originCode', 'originCode')
        .leftJoinAndSelect('hscode.country', 'country')
        .leftJoinAndSelect('hscode.year', 'year')
        .leftJoinAndSelect('hscode.additionalCode', 'additionalCode')
        .leftJoinAndSelect('hscode.name', 'hscodeName')
        .leftJoinAndSelect('hscode.standardTariff', 'standardTariff')
        .leftJoinAndSelect('hscode.aseanTariff', 'aseanTariff')
        .select([
          'hscode.hscode',
          'originCode.code',
          'country.name',
          'year.year',
          'additionalCode.code',
          'hscodeName.korean',
          'hscodeName.english',
          'standardTariff.value',
          'aseanTariff.value',
        ]);

      if (params.hscode) {
        query.andWhere('hscode.hscode = :hscode', {
          hscode: params.hscode,
        });
      }
      if (params.originCode) {
        query.andWhere('originCode.code = :code', { code: params.originCode });
      }
      if (params.country) {
        query.andWhere('country.name = :name', { name: params.country });
      }
      if (params.year) {
        query.andWhere('year.year = :year', { year: params.year });
      }
      if (params.additionalCode) {
        query.andWhere('additionalCode.code = :code', {
          code: params.additionalCode,
        });
      }
      if (params.name) {
        query.andWhere('hscodeName.korean = :korean', { korean: params.name });
      }
      if (params.standardTariff) {
        query.andWhere('standardTariff.value = :value', {
          value: params.standardTariff,
        });
      }
      if (params.aseanTariff) {
        query.andWhere('aseanTariff.value = :value', {
          value: params.aseanTariff,
        });
      }
      product = query.getMany();
      console.log(product);
    } catch (error) {
      console.log('error', error);
    }

    return product;
  }
}
