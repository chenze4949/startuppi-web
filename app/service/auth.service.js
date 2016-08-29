"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var http_1 = require('@angular/http');
var Globals = require('../globals');
var user_1 = require('../model/user');
var Auth = (function () {
    function Auth(http) {
        this.http = http;
        this.logIn$ = new Rx_1.BehaviorSubject(this.isLoggedIn);
        this.signInUrl = Globals.host + '/auth/sign_in'; // URL to web api
        this.signUpUrl = Globals.host + '/auth'; // URL to web api
        this.logIn$.asObservable();
        this.externalBS = this.logIn$;
        if (localStorage.getItem('client')) {
            if (localStorage.getItem('client').length > 0) {
                this.isLoggedIn = true;
            }
            else {
                this.isLoggedIn = false;
            }
        }
        else {
            this.isLoggedIn = false;
        }
    }
    Auth.prototype.login = function (uid, client, access_token) {
        localStorage.setItem('uid', uid);
        localStorage.setItem('client', client);
        localStorage.setItem('access-token', access_token);
        this.isLoggedIn = true;
        this.logIn$.next(this.isLoggedIn);
    };
    Auth.prototype.logout = function () {
        localStorage.setItem('uid', '');
        localStorage.setItem('client', '');
        localStorage.setItem('access-token', '');
        this.isLoggedIn = false;
        this.logIn$.next(this.isLoggedIn);
    };
    Auth.prototype.check = function () {
        return this.externalBS.asObservable().startWith(this.isLoggedIn);
    };
    Auth.prototype.signIn = function (email, password) {
        var _this = this;
        var creds = JSON.stringify({ email: email, password: password });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.signInUrl, creds, { headers: headers })
            .toPromise()
            .then(function (response) { return _this.extractSignInData(response); })
            .catch(this.handleError);
    };
    Auth.prototype.extractSignInData = function (res) {
        console.log(res);
        console.log(res.headers._headersMap.get("uid")[0]);
        console.log(res.headers._headersMap.get("client")[0]);
        console.log(res.headers._headersMap.get("access-token")[0]);
        this.login(res.headers._headersMap.get("uid")[0], res.headers._headersMap.get("client")[0], res.headers._headersMap.get("access-token")[0]);
        var data = res.json().data;
        var user = new user_1.User();
        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.currency = data.currency;
        user.profile_image_url = data.profile_image_url;
        return user;
    };
    Auth.prototype.signUp = function (email, password, name, currency) {
        var _this = this;
        var creds = JSON.stringify({ email: email, password: password, password_confirmation: password, confirm_success_url: 'localhost', name: name, currency: currency });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.signUpUrl, creds, { headers: headers })
            .toPromise()
            .then(function (response) { return _this.extractSignUpData(response); })
            .catch(this.handleError);
    };
    Auth.prototype.extractSignUpData = function (res) {
        console.log(res);
        var data = res.json().data;
        var user = new user_1.User();
        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.currency = data.currency;
        user.profile_image_url = data.profile_image_url;
        user.user_type = data.user_type;
        return user;
    };
    Auth.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    Auth = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.service.js.map