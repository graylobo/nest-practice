import { IsString } from 'class-validator';

export class CreateHscodeDto {
  @IsString()
  value: string;
}
