import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }              from './app.routing';


import { HomeComponent } from './components/home.component';
import { ActivityComponent } from './components/activity.component';
import { ProductComponent } from './components/product.component';
import { GroupComponent } from './components/group.component';
import { LoginComponent } from './components/user/login.component';
import { RegisterComponent } from './components/user/register.component';
import { DialogModule } from 'primeng/primeng';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ScheduleModule} from 'primeng/primeng';


@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    routing,
    DialogModule,
    SlimLoadingBarModule.forRoot(),
    ScheduleModule
    ],
  declarations: [ 
    AppComponent,
    HomeComponent,
    ActivityComponent,
    ProductComponent,
    GroupComponent,
    LoginComponent,
    RegisterComponent
     ],
  providers:[],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
