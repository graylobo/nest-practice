import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  readExcelFile(filePath: string): any[][] {
    // Read the Excel file
    const workbook = XLSX.readFile(filePath);

    // Get the first worksheet (assuming the data is in the first worksheet)
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert the worksheet to a 2D array
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any;
    return data;
  }
}
