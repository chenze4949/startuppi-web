import { Injectable} from '@angular/core';
import { Observable} from "rxjs/Observable";
import { Subject} from 'rxjs/Subject';
import { BehaviorSubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');
import { Article, Comment } from '../model/article';
import { User } from '../model/user';
import { ArticleCategory } from '../model/category';


@Injectable()

export class ArticleService {
    private articlesUrl = Globals.host + '/articles/';  // URL to web api
    private articleCategoriesUrl = Globals.host + '/article_categories';  // URL to web api

    constructor(private http:Http) {
        
    }

    getArticles(): Promise<Article[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.articlesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToArticles(response.json().response))
                .catch(this.handleError);
    }

    getArticleDetail(id:number): Promise<Article> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.articlesUrl + id,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToArticleDetail(response.json().response))
                .catch(this.handleError);
    }

    getArticleCategories(): Promise<ArticleCategory[]> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.articleCategoriesUrl,{headers: headers})
                .toPromise()
                .then(response => this.mapJSONToArticleCategories(response.json().response))
                .catch(this.handleError);
    }

    mapJSONToArticles(data):Article[]{
        let articles = new Array<Article>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        articles.push(this.mapJSONToArticle(element));
        }
        return articles;
    }

    mapJSONToArticle(data){
        let article:Article = new Article();
        article.id = data.id;
        article.title = data.title;
        article.publisher = data.publisher;
        article.url = data.url;
        article.icon = data.icon;
        article.video = data.video;
        article.publish_date = new Date(data.publish_date);
        return article;
    }

    mapJSONToArticleDetail(data){
        let article:Article = new Article();
        article.id = data.id;
        article.title = data.title;
        article.publisher = data.publisher;
        article.url = data.url;
        article.icon = data.icon;
        article.video = data.video;
        article.publish_date = new Date(data.publish_date);
        article.content = data.content;
        article.comments = this.mapJSONToComments(data.comments);
        article.relative_articles = this.mapJSONToArticles(data.relative_articles);
        return article;
    }

    mapJSONToArticleCategories(data):ArticleCategory[]{
        let categories = new Array<ArticleCategory>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        categories.push(this.mapJSONToCategory(element));
        }
        return categories;
    }

    mapJSONToCategory(data):ArticleCategory{
        let category:ArticleCategory = new ArticleCategory();
        category.id = data.id;
        category.name = data.name;
        
        return category;
    }

    mapJSONToComments(data):Comment[]{
        let comments = new Array<Comment>();
        for (var index = 0; index < data.length; index++) {
        var element = data[index];
        comments.push(this.mapJSONToComment(element));
        }
        return comments;
    }

    mapJSONToComment(data){
        let comment:Comment = new Comment();
        comment.id = data.id;
        comment.content = data.content;
        comment.article_id = data.article_id;
        comment.user = this.mapJSONtoUser(data.user);
        return comment;
    }

    mapJSONtoUser(data):User{
        let user:User = new User();
        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.profile_image_url = data.profile_image_url;
        return user;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }


}