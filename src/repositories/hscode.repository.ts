import { CreateHscodeDto } from 'src/controller/hscode/dto/create-hscode.dto';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { HScode } from 'src/entity';
import { Repository } from 'typeorm';

@CustomRepository(HScode)
export class HSCodeRepository extends Repository<HScode> {
  async createHsCode(hscodeDto: CreateHscodeDto): Promise<void> {
    const hscode = this.create(); // createQueryBuilder 대신 repository의 기본 메서드 사용
    hscode.value = 'test value' + hscodeDto.value;
    await this.save(hscode);
  }
}
