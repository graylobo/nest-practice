import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hscode } from './hscode.entity';
@Entity('HSCodeCountry')
export class HSCodeCountry extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => Hscode, (hscode) => hscode.originCode)
  hscodes: Hscode[];
}
