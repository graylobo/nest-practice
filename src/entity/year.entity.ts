import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hscode } from './hscode.entity';
@Entity('Year')
export class Year extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  year: string;

  @OneToMany(() => Hscode, (hscode) => hscode.originCode)
  hscodes: Hscode[];
}
