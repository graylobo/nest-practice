import { Injectable } from '@nestjs/common';
import { CrudRepository } from 'src/repositories/crud.repository';
import { CreateCrudDto } from './dto/create-crud.dto';

@Injectable()
export class CrudService {
  constructor(private crudRepo: CrudRepository) {}
  create(createCrudDto?: CreateCrudDto) {
    return this.crudRepo.createCrud(createCrudDto);
  }

  findAll() {
    return `This action returns all crud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud`;
  }

  update(id: number) {
    return `This action updates a #${id} crud`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud`;
  }
}
