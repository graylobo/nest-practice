import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { SchoolRepository } from 'src/repositories/school.repository';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([SchoolRepository])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
