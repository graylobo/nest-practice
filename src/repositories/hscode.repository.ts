import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Hscode } from 'src/entity';
import { Repository } from 'typeorm';

@CustomRepository(Hscode)
export class HSCodeRepository extends Repository<Hscode> {}
