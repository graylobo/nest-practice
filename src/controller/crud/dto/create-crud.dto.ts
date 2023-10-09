import { IsNumber } from 'class-validator';

export class CreateCrudDto {
  @IsNumber()
  name?: string;
}
