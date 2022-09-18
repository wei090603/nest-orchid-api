import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';


@Entity({name: 'user_tag'})
export class UserTag extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    name: 'title',
    length: 60,
    comment: '标签名'
  })
  public title: string;

  @ManyToMany(() => User, user => user.userTag)
  @JoinTable({
    name: "user_tag_relation",
    joinColumn: {
      name: "tag_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  }) // 可以手动指定中间表明
  public user: User;
}