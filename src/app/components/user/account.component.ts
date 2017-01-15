import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Auth } from '../../service/auth.service';
import { User, Company } from '../../model/user';

@Component({
  selector: 'account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})
export class AccountComponent implements OnInit {
  _auth:Auth;
  user:User;
  src;
  constructor(
    private router: Router,private domSanitizer : DomSanitizer,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
    }

  ngOnInit() {
    this._auth.currentUser().then(user => {
      this.user = user;
    })
    this.src = this.domSanitizer.bypassSecurityTrustResourceUrl('https://blog.mozilla.org/security/files/2015/05/HTTPS-FAQ.pdf');
  }

}
