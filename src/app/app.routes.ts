import { Routes, RouterModule } from '@angular/router';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';

import { DataResolver } from './app.resolver';

import { ActivityComponent } from './components/activity.component';
import { ProductComponent } from './components/product.component';
import { GroupComponent } from './components/group.component';
import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';
import { CenterComponent } from './components/user/center.component';
import { AccountComponent } from './components/user/account.component';
import { CompanyComponent } from './components/user/company.component';
import { OrderComponent } from './components/user/order.component';
import { ProfileComponent } from './components/user/profile.component';
import { SecurityComponent } from './components/user/security.component';
import { MessageComponent } from './components/user/message.component';
import { CoProductsComponent } from './components/user/company/co-products.component';


export const ROUTES: Routes = [
  {
    path: '',
    component: Home
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
  },
  {
      path: 'center',
      component: CenterComponent,
      children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile',  component: ProfileComponent },
          { path: 'security',  component: SecurityComponent },
          { path: 'account',  component: AccountComponent },
          { path: 'order',  component: OrderComponent },
          { 
            path: 'company',  
            component: CompanyComponent,
            children:[
              { path: '', redirectTo: 'products', pathMatch: 'full' },
              { path: 'products',  component: CoProductsComponent }
            ] 
          },
          { path: 'message',  component: MessageComponent },
      ]
  }
];
