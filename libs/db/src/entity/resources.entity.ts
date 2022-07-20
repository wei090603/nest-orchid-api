/*
 * @Description: 
 * @Author: tao.wei
 * @Date: 2021-09-22 14:36:23
 */
import { Entity, Column, ManyToMany, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Base } from "./base.entity";
import { Roles } from "./roles.entity";

@Entity('resources')
export class Resources extends Base {

  @Column('varchar', {
    name: 'title',
    length: 60,
    comment: '菜单标题'
  })
  public title: string;

  @Column('varchar', {
    name: 'type',
    length: 60,
    comment: '类型'
  })
  public type: string;

  @Column('varchar', {
    nullable: true,
    name: 'icon',
    length: 60,
    comment: '图标'
  })
  public icon: string;

  @Column('varchar', {
    name: 'path',
    length: 200,
    unique: true, // 将列标记为唯一
    comment: '路径'
  })
  public path: string;

  @Column('varchar', {
    nullable: true,
    name: 'component',
    length: 200,
    comment: '组件路径'
  })
  public component: string;

  @Column({
    type: 'boolean',
    name: 'status',
    comment: '是否显示 0-显示 1-不显示',
    default: false,
  })
  public status: boolean;

  @Column('int', {
    nullable: true,
    name: 'level',
    default: 0,
    comment: '子级数量'
  })
  public level: number;

  @Column('int', {
    name: 'sort',
    default: 255,
    comment: '排序'
  })
  public sort: number;

  @ManyToOne(() => Resources, type => type.children)
  @JoinColumn({name: 'parent_id'})
  public parent: Resources;

  @OneToMany(() => Resources, type => type.parent, {
    cascade: true,
  })
  public children: Resources[];

  @Column('int', {
    nullable: true,
    name: 'parent_id',
    default: 0,
    comment: '父级id'
  })
  public parentId: number;
  
  @ManyToMany(() => Roles, (roles) => roles.resources)
  public roles: Roles[];
}