import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

// 公告
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
    type: 'boolean',
    name: 'status',
    comment: '状态 (0未发布 1已发布)',
    default: 0,
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
