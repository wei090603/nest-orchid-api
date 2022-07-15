import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'navgation' })
export class Navgation extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    name: 'title',
    length: 50,
    comment: '菜单名',
  })
  public title: string;

  @Column({
    type: 'varchar',
    name: 'link',
    length: 255,
    comment: '链接',
  })
  public link: string;

  @Column({
    type: 'int',
    name: 'sort',
    default: 0,
    comment: '排序',
  })
  public sort: number;
}
