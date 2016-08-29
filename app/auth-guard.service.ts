import { Injectable,Inject } from '@angular/core';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Auth }  from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.auth.redirectUrl = state.url;

    // Navigate to the login page
      let link = ['/sign_in'];
      this.router.navigate(link,{queryParams:{ section : 'original'}});
    return false;
  }
}