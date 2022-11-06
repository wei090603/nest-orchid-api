import * as dayjs from 'dayjs';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('sign')
export class Sign {
  @PrimaryColumn({
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

  @PrimaryColumn({
    type: 'date',
    name: 'created_at',
    comment: '创建日期',
  })
  public createdAt: Date;
}
