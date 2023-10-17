import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Country } from 'src/entity';
import { Repository } from 'typeorm';

@CustomRepository(Country)
export class CountryRepository extends Repository<Country> {}
