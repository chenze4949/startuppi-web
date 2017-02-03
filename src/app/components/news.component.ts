import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { ArticleCategory } from '../model/category';

@Component({
  selector: 'sp-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent implements OnInit {
  categories:ArticleCategory[];
  articles:Article[];
  constructor(
    private router: Router,
    private articleService:ArticleService
    ) {}

  ngOnInit() {
    this.articleService.getArticleCategories().then(categories =>{
      this.categories = categories;
      this.articleService.getArticles().then(articles => {
        this.articles = articles;
      })
    })
    
  }

  gotoArticleDetail(article:Article){
    this.router.navigate(["/news/"+article.id]);
  }

}
