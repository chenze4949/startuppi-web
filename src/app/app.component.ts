/*
 * Angular 2 decorators and services
 */
import { Component, Inject, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Auth } from './service/auth.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import $ = require("jquery");


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
  private sub: any;
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  _auth:Auth;
  isLoggedIn:boolean;

  company_name = '';
  contact = '';
  message = '';

  constructor(
    private slimLoader: SlimLoadingBarService,
    private router: Router,
    public appState: AppState,
    @Inject(Auth) _auth) {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "http://cdn.rawgit.com/jpillora/xdomain/0.7.5/dist/xdomain.min.js";
      s.setAttribute("slave", "http://startuppi.herokuapp.com/proxy.html");
      // Use any selector
      $("head").append(s);

      this._auth = _auth;
      this.sub = this.router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              this.slimLoader.start();
          } else if ( event instanceof NavigationEnd ||
                      event instanceof NavigationCancel ||
                      event instanceof NavigationError) {
              this.slimLoader.complete();
          }
      }, (error: any) => {
          this.slimLoader.complete();
      });
  }

  ngOnInit() {
    console.log(localStorage.getItem('sp_uid'))
    console.log(localStorage.getItem('sp_client'))
    console.log(localStorage.getItem('sp_access-token'))


    this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd
      if (event instanceof NavigationStart) {
        console.log('NavigationStart:', event);
        if (event.url.includes("/#")){
          console.log("contain hash");
          let link = [event.url.replace("/#", "")];
          this.router.navigateByUrl(event.url.replace("/#", ""));
        }
      }
      
    }); 
    

    
    console.log('Initial App State', this.appState.state);

  }

  ngOnDestroy(): any {
      this.sub.unsubscribe();
  }

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  logout(){
    this._auth.logout();
    this.router.navigate(['/'],{queryParams:{}});
  }

  createBusinessCooperator(){
    if(this.company_name.length>0&&this.contact.length>0&&this.message.length>0){
      this._auth.createBusinessCooperator(this.company_name,this.contact,this.message).then(succeed=>{
        if (succeed){
          this.alertTitle = "成功";
          this.alertDetail = "感謝您提交合作意向！我們將會在7個工作日內與您聯絡。";
          this.closeFormModal();
          this.open();
          this.company_name = '';
          this.contact = '';
          this.message = '';
        }
      }).catch(error=>{})
    }else{
      this.alertTitle = "信息不完整！";
      this.alertDetail = "請填寫完整合作信息。";
      this.open();
    }
    
  }

  openContactFormModal(activity){
    var modal = document.getElementById('contactFormModal');
    modal.style.display = "block";
  }

  closeFormModal(){
    var modal = document.getElementById('contactFormModal');
    modal.style.display = "none";
  }

  alertTitle = "";
  alertDetail = "";

  public opened: boolean = false;


  public close() {
    this.opened = false;
  }

  public open() {
    
    this.opened = true;

  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
