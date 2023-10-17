import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.entity';
import { HSCodeOrigin } from '.';

@Entity()
export class Hscode {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => HSCodeOrigin, (originCode) => originCode.hscodes)
  originCode: HSCodeOrigin;

  @ManyToOne(() => Country, (country) => country.hscodes)
  country: Country;

  @Column()
  year: string;

  @Column({ nullable: true })
  additionalCode: string;

  @Column()
  combinedCode: string; // This can be computed based on originCode and additionalCode

  @Column()
  name: string;

  @Column()
  standardTariff: number;

  @Column()
  aseanTariff: number;
}
