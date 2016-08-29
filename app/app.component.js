"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var router_2 = require('@angular/router');
var auth_service_1 = require('./service/auth.service');
var sidenav_1 = require('@angular2-material/sidenav');
var button_1 = require('@angular2-material/button');
var ng2_slim_loading_bar_1 = require('ng2-slim-loading-bar');
// Services.
var angular2localization_1 = require('angular2localization/angular2localization');
// Pipes.
var angular2localization_2 = require('angular2localization/angular2localization');
var AppComponent = (function (_super) {
    __extends(AppComponent, _super);
    function AppComponent(locale, localization, router, slimLoader, _auth) {
        _super.call(this, null, localization);
        this.locale = locale;
        this.localization = localization;
        this.router = router;
        this.slimLoader = slimLoader;
        this._auth = _auth;
        this.locale.addLanguage('en');
        this.locale.addLanguage('zh');
        this.locale.definePreferredLocale('en', 'US', 30);
        this.locale.definePreferredCurrency('USD');
        this.localization.translationProvider('./resources/locale-'); // Required: initializes the translation provider with the given path prefix.
        this.localization.updateTranslation(); // Need to update the translation.
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                _this.runSlimLoader();
            }
        }, function (error) {
            _this.slimLoader.complete();
        });
        this.runSlimLoader();
        this._auth.check().subscribe(function (isLoggedIn) {
            if (localStorage.getItem('client')) {
                _this.isLoggedIn = localStorage.getItem('client').length > 0;
                if (localStorage.getItem('client').length > 0) {
                    _this.accountMode = "Account";
                }
                else {
                    _this.accountMode = "Sign in";
                }
            }
            else {
                _this.isLoggedIn = false;
                _this.accountMode = "Sign in";
            }
        });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    AppComponent.prototype.runSlimLoader = function () {
        var _this = this;
        this.slimLoader.color = 'blue';
        this.slimLoader.height = '8px';
        this.slimLoader.start();
        setTimeout(function () {
            _this.slimLoader.complete();
        }, 500);
    };
    Object.defineProperty(AppComponent.prototype, "currentCountry", {
        // Gets the current country.
        get: function () {
            return this.locale.getCurrentCountry();
        },
        enumerable: true,
        configurable: true
    });
    // Sets a new locale & currency.
    AppComponent.prototype.selectLocale = function (language, country, currency) {
        this.locale.setCurrentLocale(language, country);
        this.locale.setCurrentCurrency(currency);
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, sidenav_1.MD_SIDENAV_DIRECTIVES, button_1.MD_BUTTON_DIRECTIVES, ng2_slim_loading_bar_1.SlimLoadingBarComponent],
            providers: [auth_service_1.Auth, angular2localization_1.LocaleService, angular2localization_1.LocalizationService, ng2_slim_loading_bar_1.SlimLoadingBarService
            ],
            pipes: [angular2localization_2.TranslatePipe]
        }),
        __param(4, core_1.Inject(auth_service_1.Auth)), 
        __metadata('design:paramtypes', [angular2localization_1.LocaleService, angular2localization_1.LocalizationService, router_2.Router, ng2_slim_loading_bar_1.SlimLoadingBarService, Object])
    ], AppComponent);
    return AppComponent;
}(angular2localization_1.Locale));
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map