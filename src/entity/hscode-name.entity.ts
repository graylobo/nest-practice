import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hscode } from './hscode.entity';
@Entity('HSCodeName')
export class HSCodeName extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  korean: string;

  @Column({ unique: true, nullable: true })
  english: string;

  @OneToMany(() => Hscode, (hscode) => hscode.originCode)
  hscodes: Hscode[];
}
