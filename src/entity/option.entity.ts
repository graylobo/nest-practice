import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { OptionValue } from './optionvalue.entity';

@Entity('Option')
@Unique(['name'])
export class Option {
  @PrimaryGeneratedColumn()
  caca: number;

  @Column()
  name: string; // 색상, 사이즈 등

  @OneToMany(() => OptionValue, (optionValue) => optionValue.option, {
    cascade: true,
  })
  values: OptionValue[];

  // @ManyToMany(() => Category, (category) => category.options)
  // categories: Category[];
}
