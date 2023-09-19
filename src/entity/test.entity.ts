import { IsArray, IsEnum } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum REQUEST_TYPE {
  PURCHASE = 'PURCHASE',
  Horse = 'PAPA1',
}

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  jsonData: any;
  @Column({ type: 'jsonb', nullable: true })
  jsonbData: any;
  @IsArray()
  @Column({ type: 'json', nullable: true })
  arrayJsonData: any;

  @IsEnum(REQUEST_TYPE)
  @Column({ type: 'enum', enum: REQUEST_TYPE })
  enumData: any;

  @Column('text', { array: true, nullable: true })
  stringArray: string[];

  constructor(partial: Partial<Test>) {
    Object.assign(this, partial);
  }
}
