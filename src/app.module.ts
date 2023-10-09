import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TestcodeModule } from './testcode/testcode.module';
import { CrudModule } from './controller/crud/crud.module';
import { SchoolModule } from './controller/school/school.module';
import { StudentModule } from './controller/student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
    AuthModule,
    TestcodeModule,
    CrudModule,
    SchoolModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
