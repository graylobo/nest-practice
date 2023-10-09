import { CreateSchoolDto } from 'src/controller/school/dto/create-school.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { School } from 'src/entity/school.entity';
import { Repository } from 'typeorm';

@CustomRepository(School)
export class SchoolRepository extends Repository<School> {
  async createSchool(schoolDto: CreateSchoolDto): Promise<void> {
    const school = this.create(); // createQueryBuilder 대신 repository의 기본 메서드 사용
    school.name = schoolDto?.name ? schoolDto?.name : 'default value';

    await this.save(school);
  }
}
