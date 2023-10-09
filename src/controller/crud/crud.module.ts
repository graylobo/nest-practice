import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CrudRepository } from 'src/repositories/crud.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([CrudRepository])],
  controllers: [CrudController],
  providers: [CrudService],
})
export class CrudModule {}
