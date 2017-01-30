import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { ArticleCategory } from '../model/category';

@Component({
  selector: 'sp-news-detail',
  templateUrl: 'news-detail.component.html',
  styleUrls: ['news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  article:Article;
  constructor(
    private router: ActivatedRoute,
    private articleService:ArticleService
    ) {}

  ngOnInit() {
    this.router.params
    .switchMap((params: Params) => this.articleService.getArticleDetail(+params['id']))
    .subscribe(article => this.article = article);
  }

}
