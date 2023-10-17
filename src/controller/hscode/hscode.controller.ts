import { Controller } from '@nestjs/common';
import { ExcelService } from 'libs/excel/src';
import { HscodeService } from './hscode.service';
@Controller('hscode')
export class HscodeController {
  constructor(
    private readonly hscodeService: HscodeService,
    private readonly excelService: ExcelService,
  ) {}
}
