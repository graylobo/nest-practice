import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
@Entity()
@Unique(['value'])
export class Origin extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  originId: string;

  @Column()
  value: string;
}
