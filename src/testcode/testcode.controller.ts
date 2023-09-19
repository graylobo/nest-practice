import { Controller, Get, Param } from '@nestjs/common';
import { AppDataSource } from 'libs/database/src/app-data-source';
import { REQUEST_TYPE, Test } from 'src/entity/test.entity';

@Controller('test')
export class TestcodeController {
  constructor() {}

  @Get('insert')
  async testInsert() {
    const test = AppDataSource.getRepository(Test);

    const testEntity = new Test({ enumData: REQUEST_TYPE.Horse });
    testEntity.jsonData = { some: { hello: 'hoho' } };
    testEntity.jsonbData = { some: { hello: 'hoho' } };
    testEntity.arrayJsonData = { some: { hello: 'hoho' } };
    testEntity.stringArray = ['hasd', 'hasd', 'hasd'];
    const res = await test.save(testEntity);
    return res;
  }

  @Get(':id')
  async findTest(@Param('id') id: number) {
    const test = AppDataSource.getRepository(Test);
    const res = await test.find({ where: { id } });
    console.log('resss', res[0].arrayJsonData.some);
    console.log('resss22', res);
    return res;
  }
}
