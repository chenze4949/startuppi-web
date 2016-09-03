import { provideRouter, RouterConfig } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { Auth } from './service/auth.service';
import { HomeComponent } from './components/home.component';
import { ActivityComponent } from './components/activity.component';
import { ProductComponent } from './components/product.component';

const routes: RouterConfig = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'activity',
    component: ActivityComponent
  },
  {
    path: 'product',
    component: ProductComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),[AuthGuard,Auth]
];