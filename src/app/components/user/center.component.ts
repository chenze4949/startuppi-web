import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth.service';
import { User, Company } from '../../model/user';

@Component({
  selector: 'center',
  templateUrl: 'center.component.html',
  styleUrls: ['center.component.css']
})
export class CenterComponent implements OnInit {
  _auth:Auth;
  user:User;

  constructor(
    private router: Router,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
    }

  ngOnInit() {
    this._auth.currentUser().then(user => {
      this.user = user;
    }).catch(error => {
    })
  }

}
