import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetHscodeReqDto {
  @IsString()
  @IsOptional()
  originCode: string;
  @IsString()
  @IsOptional()
  country: string;
  @IsString()
  @IsOptional()
  year: string;
  @IsString()
  @IsOptional()
  additionalCode: string;
  @IsString()
  @IsOptional()
  hscode: string;
  @IsString()
  @IsOptional()
  name: string;
  @IsNumber()
  @IsOptional()
  standardTariff: number;
  @IsNumber()
  @IsOptional()
  aseanTariff: number;
  @IsString()
  @IsOptional()
  inquiryValue: string;
}
