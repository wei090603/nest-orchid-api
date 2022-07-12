import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base.entity';

@Entity('tag')
export class Tag extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    name: 'name',
    length: 30,
    comment: '标签名称',
  })
  public name: string;

  @ManyToMany(() => Article, (article) => article.tag)
  @JoinTable({
    name: 'tags_articles',
    joinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'article_id',
      referencedColumnName: 'id',
    },
  }) // 可以手动指定中间表明
  public article: Article[];
}
