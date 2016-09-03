import { Component,Inject, OnDestroy } from '@angular/core';
import { ROUTER_DIRECTIVES,NavigationEnd } from '@angular/router';
import { Router }           from '@angular/router';
import { Auth } from './service/auth.service'

import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { SlimLoadingBarService, SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
import { FORM_DIRECTIVES} from '@angular/common';
import { Subject, Observable, Subscription} from 'rxjs/Rx';

// Services.
import { Locale, LocaleService, LocalizationService } from 'angular2localization/angular2localization';
// Pipes.
import { TranslatePipe } from 'angular2localization/angular2localization';


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES,MD_SIDENAV_DIRECTIVES,MD_BUTTON_DIRECTIVES,SlimLoadingBarComponent],
  providers: [Auth,LocaleService, LocalizationService,SlimLoadingBarService
  ],
  pipes: [TranslatePipe]
})

export class AppComponent extends Locale {

  private accountMode;
  isLoggedIn:boolean;
  _auth;
  private sub: any;

  constructor(
    public locale: LocaleService, 
    public localization: LocalizationService,
    private router: Router,
    private slimLoader: SlimLoadingBarService,
    @Inject(Auth) _auth) {
      super(null, localization);
      this._auth = _auth;

      this.locale.addLanguage('en');
      this.locale.addLanguage('zh');

      this.locale.definePreferredLocale('en', 'US', 30);

      this.locale.definePreferredCurrency('USD');

      this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.
      this.localization.updateTranslation(); // Need to update the translation.

    }

  ngOnInit() {
    this.sub = this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
            this.runSlimLoader();
        }
    }, (error: any) => {
        this.slimLoader.complete();
    });

    this.runSlimLoader();
    this._auth.check().subscribe(isLoggedIn =>{
      if (localStorage.getItem('client')) {
        this.isLoggedIn = localStorage.getItem('client').length > 0;
        if (localStorage.getItem('client').length > 0) {
          this.accountMode = "Account";
        }else{
          this.accountMode = "Sign in";
        }
      }else{
        this.isLoggedIn = false;
        this.accountMode = "Sign in";
      }
      
    });
  }

  ngOnDestroy(): any {
      this.sub.unsubscribe();
  }

  runSlimLoader() {
      this.slimLoader.color = 'blue';
      this.slimLoader.height = '8px';
      this.slimLoader.start();
      
      setTimeout(() => {
          this.slimLoader.complete();
      }, 500);
  }

  // Gets the current country.
  get currentCountry(): string {

      return this.locale.getCurrentCountry();

  }

  // Sets a new locale & currency.
  selectLocale(language: string, country: string, currency: string): void {

      this.locale.setCurrentLocale(language, country);
      this.locale.setCurrentCurrency(currency);
      
  }

}
