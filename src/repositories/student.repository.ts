import { AppDataSource } from 'libs/database/src/app-data-source';
import { CreateStudentDto } from 'src/controller/student/dto/create-student.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { School } from 'src/entity';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';

@CustomRepository(Student)
export class StudentRepository extends Repository<Student> {
  async createStudent(studentDto: CreateStudentDto): Promise<void> {
    const student = this.create(); // createQueryBuilder 대신 repository의 기본 메서드 사용
    const schoolRepo = AppDataSource.getRepository(School);
    console.log('hahahahaha', studentDto.school);
    const school = await schoolRepo.findOne({
      where: { name: studentDto.school },
    });
    console.log('hohoho', studentDto.school);

    student.name = studentDto?.name ? studentDto?.name : 'default value';
    student.school = school;

    await this.save(student);
  }
}
