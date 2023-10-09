import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CRUD')
export class Crud {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
