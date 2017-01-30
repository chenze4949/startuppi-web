import { User } from './user'
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
    content:string;
    comments:Comment[];
    relative_articles:Article[];
}

export class Comment {
    id:number;
    content:string;
    article_id:number;
    user:User;
}
