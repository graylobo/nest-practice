import { IsDate, IsInt, IsOptional, IsUrl } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Category')
@Tree('closure-table')
@Unique(['id', 'name'])
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: string;

  // @MaxLength(30)
  @Column()
  name: string;

  // @MaxLength(30)
  @Column({ nullable: true })
  nameKo: string;

  // @MaxLength(30)
  @Column({ nullable: true })
  nameTh: string;

  @IsInt()
  @Column({ type: 'int', default: 1000 })
  order: number;

  @IsUrl()
  @IsOptional()
  @Column({ nullable: true })
  image?: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  children: Category[];
  @IsDate()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
