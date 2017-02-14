import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {
  _auth:Auth;
  email:string = "";
  pwd:string = "";

  alertTitle = "登錄失敗！";
  alertDetail = "無效郵箱或者密碼！";

  constructor(
    private router: Router,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
    }

  ngOnInit() {
  }

  login(){
    this._auth.signIn(this.email, this.pwd).then( user => {
          this.router.navigate(['/'],{queryParams:{}});
    }).catch(error => {
      console.log(error);
      this.open();
    })
  }

  public opened: boolean = false;


  public close() {
    this.opened = false;
  }

  public open() {
    
    this.opened = true;

  }
}
