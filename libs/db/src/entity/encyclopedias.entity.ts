import { Entity, Column, Index } from 'typeorm';
import { Base } from './base.entity';

// 百科
@Entity('encyclopedias')
export class Encyclopedias extends Base {
  @Column({
    type: 'varchar',
    name: 'title',
    length: 30,
    nullable: true,
    comment: '文章标题',
  })
  public title: string;

  @Column({
    type: 'int',
    name: 'reading',
    default: 0,
    comment: '阅读数量',
  })
  public reading: number;

  @Column({
    type: 'text',
    name: 'content',
    comment: '文章内容富文本',
  })
  public content: string;

  @Column({
    type: 'varchar',
    name: 'summary',
    length: 100,
    comment: '文章摘要',
  })
  public summary: string;

  @Column({
    type: 'varchar',
    name: 'cover_picture',
    length: 255,
    nullable: true,
    comment: '文章封面图',
  })
  public coverPicture: string;

  @Column({
    type: 'int',
    name: 'user_id',
    comment: '管理员id',
    default: 1,
  })
  public userId: number;

  @Column({
    type: 'int',
    name: 'category_id',
    comment: '分类ID',
  })
  @Index()
  public categoryId: number;

  @Column({
    type: 'simple-array',
    name: 'image',
    nullable: true,
    comment: '图片',
  })
  public image: string[];
}
