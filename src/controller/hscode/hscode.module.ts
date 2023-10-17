import { Module } from '@nestjs/common';
import { HscodeService } from './hscode.service';
import { HscodeController } from './hscode.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { HSCodeRepository } from 'src/repositories/hscode.repository';
import { ExcelModule } from 'libs/excel/src';
import { CountryRepository } from 'src/repositories/country.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([HSCodeRepository, CountryRepository]),
    ExcelModule,
  ],
  controllers: [HscodeController],
  providers: [HscodeService],
})
export class HscodeModule {}
