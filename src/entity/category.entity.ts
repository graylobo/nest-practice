import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Option } from './option.entity';
@Entity({ name: 'category' })
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //length 설정하지 않으면 기본 255 길이 설정
  @Column()
  name: string; // 의류, 신발, 패션잡화 등
  @ManyToMany(() => Option, (option) => option.categories, {
    cascade: true,
  })
  @JoinTable()
  options: Option[];
}
