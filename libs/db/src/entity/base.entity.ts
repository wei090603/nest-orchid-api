import { Transform, TransformFnParams } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建日期',
  })
  public createdAt: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新日期',
  })
  public updatedAt: Date;

  @Transform((row: TransformFnParams) => +new Date(row.value))
  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
    select: false,
    comment: '软删除时间',
  })
  public deleteAt: Date;
}
