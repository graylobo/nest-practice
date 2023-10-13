import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity()
@Unique(['korean'])
@Unique(['english'])
export class HsCodeName extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  korean: string;
  @Column({ nullable: true })
  english: string;
}
