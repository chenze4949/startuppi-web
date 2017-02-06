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


  private sub: any;
  category_id:number;

  current_page:number = 1;
  pages:number = 1;

  constructor(
    private router: Router,
    private articleService:ArticleService
    ) {}

  ngOnInit() {
    this.sub = this.router
    .routerState
    .root
    .queryParams
    .subscribe(params => {
      if (params['category_id'] && params['category_id'].length > 0) {
        this.category_id = params['category_id'];
      }

      if (params['current_page'] && params['current_page'].length > 0) {
        this.current_page = params['current_page'];
      }

      this.articleService.getArticleCategories().then(categories =>{
        this.categories = categories;
        this.articleService.getArticles(this.category_id, this.current_page).then(response => {
          this.current_page = response.json().pagination.current_page;
          this.pages = response.json().pagination.total_pages;
          this.articles = this.articleService.mapJSONToArticles(response.json().response);
        })
      })

    });
    
    
  }


  onPreviousPage(){
    if (this.current_page != 1){
      this.current_page = this.current_page - 1;

      if (this.category_id){
        this.router.navigate(['/news'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/news'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  onNextPage(){
    if (this.current_page < this.pages){
      this.current_page = this.current_page + 1;
      if (this.category_id){
        this.router.navigate(['/news'], {queryParams: {category_id:this.category_id, current_page:this.current_page}});
      }else{
        this.router.navigate(['/news'], {queryParams: {current_page:this.current_page}});
      }
    }
  }

  gotoArticleDetail(article:Article){
    this.router.navigate(["/news/"+article.id]);
  }

  onCategory(category:ArticleCategory){
    this.articles = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(['/news'], {queryParams: {category_id:category.id}});
  }

  onAll(){
    this.articles = null;
    this.category_id = null;
    this.current_page = 1;
    this.pages = 1;
    this.router.navigate(["/news"]);
  }

}
