import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { StudentRepository } from 'src/repositories/student.repository';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([StudentRepository])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
