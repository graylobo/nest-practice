import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Student } from './student.entity';

@Entity('School')
@Unique(['name'])
export class School {
  @PrimaryGeneratedColumn()
  schoolCode: string;
  @Column()
  name: string;

  @OneToMany(() => Student, (student) => student.school)
  students: Student[];
}
