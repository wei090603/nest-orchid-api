import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';
import { ArticleLike } from './articleLike.entity';
import { ArticleCollect } from './articleCollect.entity';

@Entity('article')
export class Article extends Base {
  @Column({
    type: 'varchar',
    name: 'title',
    length: 30,
    nullable: true,
    comment: '文章标题',
  })
  public title: string;

  @Column('simple-array', {
    name: 'image',
    nullable: true,
    comment: '文章图片',
  })
  public image: string[];

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
    name: 'status',
    comment: '是否回复 1-打开回复 2-关闭回复 3-仅自己可见',
    default: 1,
  })
  public status: number;

  @Column({
    type: 'boolean',
    name: 'is_top',
    comment: '是否置顶 0-未置顶 1-已置顶',
    default: false,
  })
  public isTop: boolean;

  @Column({
    type: 'int',
    nullable: true,
    name: 'sort',
    comment: '排序',
  })
  public sort: number;

  @Column({
    type: 'boolean',
    name: 'type',
    comment: '0-文本 1-富文本',
    default: false,
  })
  public type: boolean;

  @Column({
    type: 'int',
    name: 'like_count',
    default: 0,
    comment: '点赞数量',
  })
  public likeCount: number;

  @Column({
    type: 'int',
    name: 'comment_count',
    default: 0,
    comment: '评论数量',
  })
  public commentCount: number;

  @ManyToOne(() => Category, (category) => category.article)
  @JoinColumn({ name: 'category_id' })
  public category: Category;

  @ManyToMany(() => Tag, (tag) => tag.article, { cascade: true }) // cascade 如果标签不存在则会自动添加
  public tag: Tag[];

  // 点赞用户
  @OneToMany(() => ArticleLike, (articleLike) => articleLike.article)
  public like: ArticleLike[];

  // 收藏用户
  @OneToMany(() => ArticleCollect, (articleCollect) => articleCollect.article)
  public collect: ArticleCollect[];

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  public comment: Comment[];

  @ManyToOne(() => User, (user) => user.article)
  @JoinColumn({ name: 'author_id' })
  public author: User;
}
