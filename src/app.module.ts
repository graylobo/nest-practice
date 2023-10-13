import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HscodeModule } from './controller/hscode/hscode.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
    AuthModule,
    HscodeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
