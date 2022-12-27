import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

// 关注
@Entity({ name: 'article_collect' })
export class ArticleCollect {
  @PrimaryColumn({
    type: 'int',
    name: 'article_id',
    comment: '收藏文章id',
  })
  @Index()
  public articleId: number;

  @PrimaryColumn({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;
}
