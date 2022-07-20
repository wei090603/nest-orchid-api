import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({name: 'notice'})
export class Notice extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    name: 'title',
    length: 50,
    comment: '标题',
  })
  public title: string;

  @Column({
    type: 'int',
    name: 'type',
    comment: '公告类型（1通知 2公告）',
  })
  public type: number
  
  @Column({
    type: 'boolean',
    name: 'status',
    comment: '状态 (0隐藏 1显示)',
    default: true,
  })
  public status: boolean;

  @Column({
    name: 'content',
    comment: '公告内容',
    type: 'longtext',
    default: null
  })
  public content: string

  @Column({ name: 'create_by', comment: '创建人', length: "50", default: '' })
  public createBy: string

}
