import { provideRouter, RouterConfig }  from '@angular/router';
import { AuthGuard }             from './auth-guard.service';
import { Auth }        from './service/auth.service';

const routes: RouterConfig = [

];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),[AuthGuard,Auth]
];