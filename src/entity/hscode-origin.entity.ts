import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hscode } from './hscode.entity';
@Entity('HSCodeOrigin')
export class HSCodeOrigin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @OneToMany(() => Hscode, (hscode) => hscode.originCode)
  hscodes: Hscode[];
}
