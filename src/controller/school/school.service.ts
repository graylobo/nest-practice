import { Injectable } from '@nestjs/common';
import { SchoolRepository } from 'src/repositories/school.repository';
import { CreateSchoolDto } from './dto/create-school.dto';

@Injectable()
export class SchoolService {
  constructor(private schoolRepo: SchoolRepository) {}
  create(createSchoolDto: CreateSchoolDto) {
    return this.schoolRepo.createSchool(createSchoolDto);
  }

  findAll() {
    return `This action returns all school`;
  }

  findOne(id: number) {
    return `This action returns a #${id} school`;
  }
}
