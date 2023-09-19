import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Option } from './option.entity';
import { Category } from './category.entity';
@Entity('OptionValue')
@Unique(['id', 'value'])
export class OptionValue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string; // L, M, S, 230mm, 240mm 등

  @ManyToOne(() => Option, (option) => option.values)
  option: Option;
  // 카테고리 관계 추가
  @ManyToOne(() => Category)
  category: Category;
}
