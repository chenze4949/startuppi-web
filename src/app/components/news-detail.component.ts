import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { ArticleService } from '../service/article.service';
import { Article } from '../model/article';
import { ArticleCategory } from '../model/category';
import { User } from '../model/user';
import { Auth } from '../service/auth.service';
import $ = require("jquery");

@Component({
  selector: 'sp-news-detail',
  templateUrl: 'news-detail.component.html',
  styleUrls: ['news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  article:Article;
  _auth;
  user:User;
  content = "";
  constructor(
    private router: Router,
    private activcatedRouter: ActivatedRoute,
    private articleService:ArticleService,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
      this._auth.currentUser().then(user => {
        this.user = user;
      }).catch(error =>{})
    }

  ngOnInit() {
    this.activcatedRouter.params
    .switchMap((params: Params) => this.articleService.getArticleDetail(+params['id']))
    .subscribe(article => {
      this.article = article;
      console.log('preparing to load...')
      let node = document.createElement('script');
      node.src = '/assets/social-share.min.js';
      node.type = 'text/javascript';
      node.async = true;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
      
    });


    
    
  }

  postComment(){
    if (this.content.length > 0){
      this.articleService.postComment(this.article.id, this.content).then(article =>{
        this.articleService.getArticleDetail(this.article.id).then(article => {
          this.article = article;
          this.content = "";
        })
      }).catch(error =>{

      })
    }
    
  }


  gotoArticleDetail(article:Article){
    this.router.navigate(["/news/"+article.id]);
  }
}
