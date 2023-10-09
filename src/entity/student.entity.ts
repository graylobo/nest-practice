import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { School } from './school.entity';

@Entity('Student')
export class Student {
  @PrimaryGeneratedColumn()
  studentCode: string;

  @Column()
  name: string;

  @ManyToOne(() => School, { nullable: false })
  school: School;
}
