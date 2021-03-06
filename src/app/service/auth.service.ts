import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/Rx';
import { Headers, Http } from '@angular/http';
import Globals = require('../globals');
import { User, Company } from '../model/user';


@Injectable()

export class Auth {
    isLoggedIn:boolean;
    logIn$: Subject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn);
    externalBS;

    redirectUrl: string;

    private signInUrl = Globals.host_v + '/auth/sign_in';  // URL to web api
    private signUpUrl = Globals.host_v + '/auth';  // URL to web api
    private currentUserUrl = Globals.host + "/users/get_current_user";
    private updateUrl = Globals.host + '/users/update';  // URL to web api
    private resetPasswordUrl = Globals.host + '/users/reset_password';  // URL to web api
    private createBusinessCooperatorUrl = Globals.host + '/business_cooperators';  // URL to web api

    constructor(private http:Http) {
        this.logIn$.asObservable();
        this.externalBS = this.logIn$;
        if (localStorage.getItem('sp_client')) {
            if (localStorage.getItem('sp_client').length > 0) {
                this.isLoggedIn = true;
            }else{
                this.isLoggedIn = false;
            }
        }else{
            this.isLoggedIn = false;
        }
        
    }


    login(uid:string,client:string,access_token:string) {
        localStorage.setItem('sp_uid',uid);
        localStorage.setItem('sp_client',client);
        localStorage.setItem('sp_access-token',access_token);
        this.isLoggedIn = true;
        this.logIn$.next(this.isLoggedIn);
    }


    logout() {
        localStorage.setItem('sp_uid','');
        localStorage.setItem('sp_client','');
        localStorage.setItem('sp_access-token','');
        this.isLoggedIn = false;   
        this.logIn$.next(this.isLoggedIn);         
    }

    isAuthenticated():boolean{
        if (localStorage.getItem('sp_client')) {
            if (localStorage.getItem('sp_client').length > 0) {
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    currentUid():String{
        if (localStorage.getItem('sp_client')) {
            if (localStorage.getItem('sp_client').length > 0) {
                return localStorage.getItem('sp_uid');
            }else{
                return "";
            }
        }else{
            return "";
        }
    }

    check() {
        return this.externalBS.asObservable().startWith(this.isLoggedIn);
    }

    signIn(email:string,password:string): Promise<User> {
    let creds = JSON.stringify({ email: email, password: password });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.signInUrl,creds,{headers: headers})
                .toPromise()
                .then(response => this.extractSignInData(response))
                .catch(this.handleError);
    }

    currentUser(): Promise<User> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('uid', localStorage.getItem('sp_uid'));
        headers.append('client', localStorage.getItem('sp_client'));
        headers.append('access-token', localStorage.getItem('sp_access-token'));
        console.log("sp_uid" + localStorage.getItem('sp_uid'));
        console.log("sp_client" + localStorage.getItem('sp_client'));
        console.log("sp_access-token" + localStorage.getItem('sp_access-token'));
        return this.http.get(this.currentUserUrl,{headers: headers})
                .toPromise()
                .then(response => this.extractCurrentUserData(response))
                .catch(this.handleError);
    }

    extractSignInData(res){
        console.log(res)
        console.log(res.headers._headers.get("uid")[0])
        console.log(res.headers._headers.get("client")[0])
        console.log(res.headers._headers.get("access-token")[0])
        this.login(res.headers._headers.get("uid")[0],res.headers._headers.get("client")[0],res.headers._headers.get("access-token")[0]);
        let data = res.json().response
        let user:User = new User();
        user.id = data.id;
        user.name = data.name;
        user.email = data.email;
        user.currency = data.currency;
        user.profile_image_url = data.profile_image_url;
        return user;
    }

    signUp(email:string,password:string,name:string): Promise<User> {
    let creds = JSON.stringify({ email: email, name:name, password: password, password_confirmation:password, confirm_success_url:'localhost', user_type:'customer'});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.signUpUrl,creds,{headers: headers})
                .toPromise()
                .then(response => this.extractSignUpData(response))
                .catch(this.handleError);
    }

    extractSignUpData(res){
        console.log(res)
        let data = res.json().data
        let user:User = new User();
        user.id = data.id;
        user.name = data.name;
        user.nickname = data.nickname;
        user.email = data.email;
        user.currency = data.currency;
        user.profile_image_url = data.profile_image_url;
        user.user_type = data.user_type;
        return user;
    }

    update(user:User): Promise<boolean> {
        let creds = JSON.stringify({ user: {name:user.name, email:user.email, nickname:user.nickname}});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('uid', localStorage.getItem('sp_uid'));
        headers.append('client', localStorage.getItem('sp_client'));
        headers.append('access-token', localStorage.getItem('sp_access-token'));
        console.log("sp_uid" + localStorage.getItem('sp_uid'));
        console.log("sp_client" + localStorage.getItem('sp_client'));
        console.log("sp_access-token" + localStorage.getItem('sp_access-token'));
        return this.http.post(this.updateUrl,creds,{headers: headers})
                    .toPromise()
                    .then(response => true)
                    .catch(this.handleError);
    }
    
    resetPassword(old_password:string, password:string): Promise<boolean> {
        let creds = JSON.stringify({ user: {old_password:old_password, password:password, password_confirmation:password}});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('uid', localStorage.getItem('sp_uid'));
        headers.append('client', localStorage.getItem('sp_client'));
        headers.append('access-token', localStorage.getItem('sp_access-token'));
        console.log("sp_uid" + localStorage.getItem('sp_uid'));
        console.log("sp_client" + localStorage.getItem('sp_client'));
        console.log("sp_access-token" + localStorage.getItem('sp_access-token'));
        return this.http.post(this.resetPasswordUrl,creds,{headers: headers})
                    .toPromise()
                    .then(response => true)
                    .catch(this.handleError);
    }

    createBusinessCooperator(company_name:string, contact:string, message:string): Promise<boolean> {
        let creds = JSON.stringify({ business_cooperator: {company_name:company_name, contact:contact, message:message}});
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.createBusinessCooperatorUrl,creds,{headers: headers})
                    .toPromise()
                    .then(response => true)
                    .catch(this.handleError);
    }

    extractCurrentUserData(res){
        console.log(res)
        let data = res.json().response
        return this.mapJSONtoUser(data);
    }

    mapJSONtoUser(data):User{
        let user:User = new User();
        user.id = data.id;
        user.name = data.name;
        user.nickname = data.nickname;
        user.email = data.email;
        user.currency = data.currency;
        user.profile_image_url = data.profile_image_url;
        user.user_type = data.user_type;
        user.dollar = data.dollar;
        if (data.company){
            user.company = this.mapJSONtoCompany(data.company);
        }
        return user;
    }

    mapJSONtoCompany(data):Company{
        let company:Company = new Company();
        company.id = data.id;
        company.name = data.name;
        return company;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }

}