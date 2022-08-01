import * as dayjs from 'dayjs';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  AfterLoad,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
    comment: '创建日期',
    default: () => 'CURRENT_TIMESTAMP',
    precision: null,
    transformer: {
      from(value) {
        return value
          ? (dayjs(value).format('YYYY-MM-DD HH:MM:ss') as unknown as Date)
          : value;
      },
      to: (value) => value,
    },
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
    comment: '更新日期',
    transformer: {
      from(value) {
        return value
          ? (dayjs(value).format('YYYY-MM-DD HH:MM:ss') as unknown as Date)
          : value;
      },
      to: (value) => value,
    },
  })
  public updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    name: 'delete_at',
    select: false,
    comment: '软删除时间',
  })
  public deleteAt: Date;
}
