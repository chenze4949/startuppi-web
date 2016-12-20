/*
 * Angular 2 decorators and services
 */
import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { Auth } from './service/auth.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  _auth;
  isLoggedIn:boolean;

  constructor(
    public appState: AppState,
    @Inject(Auth) _auth) {
      this._auth = _auth;
  }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "http://cdn.rawgit.com/jpillora/xdomain/0.7.5/dist/xdomain.min.js";
    s.setAttribute("slave", "http://startuppi.herokuapp.com/proxy.html");
    // Use any selector
    $("head").append(s);
    console.log('Initial App State', this.appState.state);
  }

  
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
