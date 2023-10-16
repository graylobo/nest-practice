import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity()
export class HSCodeOrigin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  value: string;

  @Column({ nullable: true })
  korean: string;
  @Column({ nullable: true })
  english: string;
  @Column({ nullable: true })
  origin: string;

  @Column({ nullable: true })
  basic: string;
  @Column({ nullable: true })
  add: string;
  @Column({ nullable: true })
  standardTariff: string;
  @Column({ nullable: true })
  aseanTariff: string;
  @Column({ nullable: true })
  year: string;
}
