import { User } from './user'
import { ArticleCategory } from './category'
/**
 * Article
 */
export class Article {
    id:number;
    title:string;
    publisher:string;
    url:string;
    icon:string;
    video:string;
    publish_date:Date;
    publish_date_str:String;
    content:string;
    article_category:ArticleCategory;
    comments:Comment[];
    relative_articles:Article[];
    month:string;
    day:string;
}

export class Comment {
    id:number;
    content:string;
    article_id:number;
    user:User;
    created_at:Date;
    created_at_str:String;
}
