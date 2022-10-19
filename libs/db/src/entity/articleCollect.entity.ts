import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity({ name: 'collect' })
export class ArticleCollect extends Base {
  @OneToOne(() => Article)
  @JoinColumn({ name: 'article_id' })
  public article: Article;

  @ManyToOne(() => User, (user) => user.collect)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
