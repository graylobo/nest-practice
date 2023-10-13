import { Injectable } from '@nestjs/common';
import { CreateHscodeDto } from './dto/create-hscode.dto';
import { HSCodeRepository } from 'src/repositories/hscode.repository';

@Injectable()
export class HscodeService {
  constructor(private hscodeRepo: HSCodeRepository) {}
  create(createHscodeDto: CreateHscodeDto) {
    return this.hscodeRepo.createHsCode(createHscodeDto);
  }

  findAll() {
    return `This action returns all hscode`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hscode`;
  }
}
