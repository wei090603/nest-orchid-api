import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'encyclopedias_ategory' })
export class EncyclopediasCategory extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    name: 'title',
    length: 60,
    comment: '分类名称',
  })
  public title: string;

  @Column({
    type: 'varchar',
    unique: true,
    name: 'route',
    length: 60,
    comment: '路由名称',
  })
  public route: string;

  @Column({
    type: 'int',
    nullable: true,
    name: 'sort',
    comment: '排序',
  })
  public sort: number;
}
