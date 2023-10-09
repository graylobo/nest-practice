import { Injectable } from '@nestjs/common';
import { StudentRepository } from 'src/repositories/student.repository';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private studentRepo: StudentRepository) {}
  create(createStudentDto: CreateStudentDto) {
    return this.studentRepo.createStudent(createStudentDto);
  }

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }
}
