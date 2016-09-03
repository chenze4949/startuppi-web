import { provideRouter, RouterConfig } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { Auth } from './service/auth.service';
import { HomeComponent } from './components/home.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),[AuthGuard,Auth]
];