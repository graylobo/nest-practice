import { Injectable } from '@nestjs/common';
import { HSCodeRepository } from 'src/repositories/hscode.repository';

@Injectable()
export class HscodeService {
  constructor(private hscodeRepo: HSCodeRepository) {}
}
