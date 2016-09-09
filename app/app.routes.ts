import { provideRouter, RouterConfig } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { Auth } from './service/auth.service';
import { HomeComponent } from './components/home.component';
import { ActivityComponent } from './components/activity.component';
import { ProductComponent } from './components/product.component';
import { GroupComponent } from './components/group.component';
import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';

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
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'group',
    component: GroupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes),[AuthGuard,Auth]
];