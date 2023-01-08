import * as dayjs from 'dayjs';
import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('sign')
export class Sign {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  public id: number;

  @Column({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;

  @Column('int', {
    name: 'favs',
    comment: '签到获得积分数量',
  })
  public favs: number;

  @Column({
    type: 'date',
    name: 'created_at',
    comment: '签到日期',
  })
  @Index()
  public createdAt: Date;
}
