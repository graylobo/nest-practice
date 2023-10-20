import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { HSCodeAddionalCode, HSCodeName, HSCodeOrigin, Year } from '.';
import { StandardTariff } from './standard-tariff.entity';
import { AseanTariff } from './asean-tariff.entity';

@Entity()
export class Hscode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  hscode: string;
  @ManyToOne(() => HSCodeOrigin, (originCode) => originCode.hscodes)
  originCode: HSCodeOrigin;

  @ManyToOne(() => Country, (country) => country.hscodes)
  country: Country;

  @ManyToOne(() => Year, (year) => year.hscodes)
  year: Year;

  @ManyToOne(
    () => HSCodeAddionalCode,
    (additionalCode) => additionalCode.hscodes,
  )
  additionalCode: HSCodeAddionalCode;

  @ManyToOne(() => HSCodeName, (hscodeName) => hscodeName.hscodes)
  name: HSCodeName;

  @ManyToOne(() => StandardTariff, (standardTariff) => standardTariff.hscodes)
  standardTariff: StandardTariff;

  @ManyToOne(() => AseanTariff, (aseanTariff) => aseanTariff.hscodes)
  aseanTariff: AseanTariff;
}
