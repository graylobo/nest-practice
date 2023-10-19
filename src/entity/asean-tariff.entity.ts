import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hscode } from './hscode.entity';

@Entity('AseanTariff')
export class AseanTariff extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'double precision' })
  value: number;

  @OneToMany(() => Hscode, (hscode) => hscode.country)
  hscodes: Hscode[];
}
