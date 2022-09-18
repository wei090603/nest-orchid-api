import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'comment' })
export class Comment extends Base {
  @Column({
    type: 'varchar',
    name: 'content',
    length: 200,
    comment: '评论内容',
  })
  public content: string;

  @Column({
    type: 'int',
    name: 'hands',
    default: 0,
    comment: '点赞数量',
  })
  public hands: number;

  @Column({
    type: 'boolean',
    name: 'status',
    comment: '是否显示 0-不显示 1-显示',
    default: true,
  })
  public status: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' }) // 评论用户
  public user: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'reply_id' }) // 回复
  public reply: User;

  @ManyToOne(() => Article, (article) => article.comment)
  @JoinColumn({ name: 'article_id' })
  @JoinTable({ name: 'article_comment' })
  public article: Article;

  @ManyToOne(() => Comment, (type) => type.children)
  @JoinColumn({ name: 'parent_id' })
  public parent: Comment;

  @OneToMany(() => Comment, (type) => type.parent, {
    cascade: true,
  })
  public children: Comment[];

  @Column('int', {
    nullable: true,
    name: 'parent_id',
    default: null,
    comment: '父级id',
  })
  public parentId: number;
}
