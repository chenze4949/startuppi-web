import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { Auth } from '../../service/auth.service';

@Component({
  selector: 'security',
  templateUrl: 'security.component.html',
  styleUrls: ['security.component.css']
})
export class SecurityComponent implements OnInit {

  _auth:Auth;

  old_password = "";
  password = "";
  password_confirmation = "";

  constructor(
    private router: Router,
    @Inject(Auth) _auth
    ) {
      this._auth = _auth;
    }

  ngOnInit() {
    
  }

  update(){

    if (this.old_password.length>0&&this.password.length>0&&this.password_confirmation.length>0&&this.password==this.password_confirmation){
      this._auth.resetPassword(this.old_password, this.password).then(succeed => {
        this.old_password = "";
        this.password = "";
        this.password_confirmation = "";
      }).catch(error => {
        this._auth.logout();
        this.router.navigate(['/'],{queryParams:{}});
      })
    }
  }

}
