import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
import { HsCodeName } from './hscode-name.entity';
@Entity()
@Unique(['value'])
export class HScode extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  value: string;

  @ManyToOne(() => Origin)
  @JoinColumn()
  origin: Origin;
  @ManyToOne(() => HsCodeName)
  @JoinColumn()
  name: HsCodeName;

  @ManyToOne(() => Basic)
  @JoinColumn()
  basic: Basic;
  @JoinColumn()
  @ManyToOne(() => Add)
  add: Add;
  @ManyToOne(() => StandardTariff)
  @JoinColumn()
  standardTariff: StandardTariff;
  @ManyToOne(() => AseanTariff)
  @JoinColumn()
  aseanTariff: AseanTariff;
  @ManyToOne(() => Year)
  @JoinColumn()
  year: Year;
}
