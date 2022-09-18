import { Entity, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Article } from "./article.entity";
import { Base } from "./base.entity";
import { User } from "./user.entity";

@Entity({name: 'article_like'})
export class ArticleLike extends Base {

  @ManyToOne(() => Article, (article) => article.like)
  @JoinColumn({name: 'article_id'})
  public article: Article;

  @ManyToOne(() => User, (user) => user.articleLike)
  @JoinColumn({name: 'user_id'})
  public user: User;
}