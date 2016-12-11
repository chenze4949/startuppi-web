import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

import { ActivityComponent } from './components/activity.component';
import { ProductComponent } from './components/product.component';
import { ProductDetailComponent } from './components/product-detail.component';
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
import { CoProductCreateComponent } from './components/user/company/co-product-create.component';
import { CoProductEditComponent } from './components/user/company/co-product-edit.component';
import { CoProfileComponent } from './components/user/company/co-profile.component';
import { CoPlansComponent } from './components/user/company/co-plans.component';
import { CoPlanCreateComponent } from './components/user/company/co-plan-create.component';
import { CoPlanEditComponent } from './components/user/company/co-plan-edit.component';


export const ROUTES: Routes = [
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
    component: ProductDetailComponent
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
              { path: '', redirectTo: 'profile', pathMatch: 'full' },
              { path: 'profile',  component: CoProfileComponent },
              { path: 'products',  component: CoProductsComponent },
              { path: 'create_product',  component: CoProductCreateComponent },
              { path: 'edit_product',  component: CoProductEditComponent },
              { path: 'plans',  component: CoPlansComponent },
              { path: 'create_plan',  component: CoPlanCreateComponent },
              { path: 'edit_plan',  component: CoPlanEditComponent },
            ] 
          },
          { path: 'message',  component: MessageComponent },
      ]
  },
];
