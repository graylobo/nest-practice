import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hscode } from './hscode.entity';

@Entity('Country')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Hscode, (hscode) => hscode.country)
  hscodes: Hscode[];
}
