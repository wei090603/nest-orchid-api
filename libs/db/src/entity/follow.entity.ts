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

  @ManyToOne(() => User, (user) => user.followUser)
  @JoinColumn({ name: 'follow_user_id' })
  public followUser: User;

  @ManyToOne(() => User, (user) => user.follow)
  @JoinColumn({ name: 'user_id' })
  public user: User;

  // @ManyToMany(() => User, (user) => user.follow)
  // @JoinTable({
  //   name: 'user_follow_relation',
  //   joinColumn: {
  //     name: 'follow_id',
  //     referencedColumnName: 'follow',
  //   },
  //   inverseJoinColumn: {
  //     name: 'user_id',
  //     referencedColumnName: 'id',
  //   },
  // }) // 可以手动指定中间表明
  // public user: User;
}
