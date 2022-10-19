import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

// 关注
@Entity({ name: 'follow' })
export class Follow extends Base {
  @Column({
    type: 'int',
    name: 'type',
    comment: '公告类型（2关注我 1我关注）',
  })
  public type: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'follow_id' })
  public follow: User;

  @ManyToOne(() => User, (user) => user.collect)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
