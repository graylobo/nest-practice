import { Repository } from 'typeorm';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Crud } from 'src/entity/crud.entity';
import { CreateCrudDto } from 'src/controller/crud/dto/create-crud.dto';

@CustomRepository(Crud)
export class CrudRepository extends Repository<Crud> {
  async createCrud(crudDto: CreateCrudDto): Promise<void> {
    const hscode = this.create(); // createQueryBuilder 대신 repository의 기본 메서드 사용
    hscode.name = crudDto?.name ? crudDto?.name : 'default value';

    await this.save(hscode);
  }
}
