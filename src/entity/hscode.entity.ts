import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { HSCodeCountry, HSCodeName, HSCodeOrigin, Year } from '.';
import { StandardTariff } from './standard-tariff.entity';
import { AseanTariff } from './asean-tariff.entity';

@Entity()
export class Hscode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  combinedCode: string;
  @ManyToOne(() => HSCodeOrigin, (originCode) => originCode.hscodes)
  originCode: HSCodeOrigin;

  @ManyToOne(() => Country, (country) => country.hscodes)
  country: Country;

  @ManyToOne(() => Year, (year) => year.hscodes)
  year: Year;

  @ManyToOne(() => HSCodeCountry, (countryCode) => countryCode.hscodes)
  additionalCode: HSCodeCountry;

  @ManyToOne(() => HSCodeName, (hscodeName) => hscodeName.hscodes)
  name: HSCodeName;

  @ManyToOne(() => StandardTariff, (standardTariff) => standardTariff.hscodes)
  standardTariff: StandardTariff;

  @ManyToOne(() => AseanTariff, (aseanTariff) => aseanTariff.hscodes)
  aseanTariff: AseanTariff;
}
