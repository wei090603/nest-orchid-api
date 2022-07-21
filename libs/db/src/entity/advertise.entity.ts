import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'advertise' })
export class Advertise extends Base {
  @Column({
    type: 'varchar',
    name: 'title',
    length: 30,
    comment: '广告标题',
  })
  public title: string;

  @Column({
    type: 'varchar',
    name: 'picture',
    length: 200,
    comment: '图片地址',
  })
  public picture: string;

  @Column({
    type: 'varchar',
    name: 'type',
    length: 30,
    comment: '使用位置 home-首页',
  })
  public type: string;

  @Column({
    type: 'varchar',
    name: 'describe',
    length: 200,
    nullable: true,
    comment: '广告描述',
  })
  public describe: string;

  @Column({
    type: 'boolean',
    name: 'status',
    comment: '状态 0-隐藏 1-显示',
    default: true,
  })
  public status: boolean;
}
