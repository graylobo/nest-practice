import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Post()
  create(@Body() createCrudDto: CreateCrudDto) {
    console.log('emfndha');
    return this.crudService.create(createCrudDto);
  }

  @Post('hello')
  create2() {
    console.log('emfndha');
    return this.crudService.create();
  }

  @Get()
  findAll() {
    return this.crudService.findAll();
  }
}
