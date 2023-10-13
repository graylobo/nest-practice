import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Add } from './add.entity';
import { Basic } from './basic.entity';
import { Origin } from './origin.entity';
import { Year } from './year.entity';
import { StandardTariff } from './standard-tariff';
import { AseanTariff } from './asean-tariff';
@Entity()
@Unique(['value'])
export class HScode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @OneToOne(() => Origin)
  @JoinColumn()
  origin: Origin;

  @OneToOne(() => Basic)
  @JoinColumn()
  basic: Basic;
  @JoinColumn()
  @OneToOne(() => Add)
  add: Add;
  @OneToOne(() => StandardTariff)
  @JoinColumn()
  standardTariff: StandardTariff;
  @OneToOne(() => AseanTariff)
  @JoinColumn()
  aseanTariff: AseanTariff;
  @OneToOne(() => Year)
  @JoinColumn()
  year: Year;
}
