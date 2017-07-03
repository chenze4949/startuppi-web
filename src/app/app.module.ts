import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home';
import { NoContentComponent } from './no-content';
import { XLarge } from './home/x-large';


import { ActivityComponent } from './components/activity.component';
import { NewsComponent } from './components/news.component';
import { NewsDetailComponent } from './components/news-detail.component';
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
import { CoPlansComponent } from './components/user/company/co-plans.component';
import { CoProfileComponent } from './components/user/company/co-profile.component';
import { CoCreateComponent } from './components/user/company/co-create.component';
import { CoPlanCreateComponent } from './components/user/company/co-plan-create.component';
import { CoPlanEditComponent } from './components/user/company/co-plan-edit.component';
import { PrivacyComponent } from './components/files/privacy.component';
import { TermsComponent } from './components/files/terms.component';
import { ContactComponent } from './components/files/contact.component';
import { AboutComponent } from './components/files/about.component';
import { BusyModule } from 'angular2-busy';


import { AuthGuard } from './guards/auth.guard';

import { Auth } from './service/auth.service';
import { ServiceService } from './service/service.service';
import { EventService } from './service/event.service';
import { ArticleService } from './service/article.service';
import { GroupService } from './service/group.service';
import { UploadService } from './service/upload.service';

// import { DialogModule } from 'primeng/primeng';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ScheduleModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { DataListModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { TabViewModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { CalendarModule } from 'primeng/primeng';
import { ModalModule } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { GroupModal } from './components/modal/group-modal';
import { GroupCreateModal } from './components/modal/group-create-modal';
import { EventCreateModal } from './components/modal/event-create-modal';
import { FileUploadModule } from 'ng2-file-upload';
import { MdTabsModule } from '@angular2-material/tabs';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap/index';
import { DropdownModule } from 'ng2-bootstrap';
import { DropdownConfig } from 'ng2-bootstrap';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CustomFormsModule } from 'ng2-validation'
import { KSSwiperModule } from 'angular2-swiper';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLarge,
    ActivityComponent,
    NewsComponent,
    NewsDetailComponent,
    ProductComponent,
    ProductDetailComponent,
    GroupComponent,
    LoginComponent,
    RegisterComponent,
    CenterComponent,
    AccountComponent,
    CompanyComponent,
    CoProductsComponent,
    CoProductCreateComponent,
    CoProductEditComponent,
    CoProfileComponent,
    CoCreateComponent,
    CoPlansComponent,
    CoPlanCreateComponent,
    CoPlanEditComponent,
    OrderComponent,
    ProfileComponent,
    SecurityComponent,
    MessageComponent,
    GroupModal,
    GroupCreateModal,
    EventCreateModal,
    PrivacyComponent,
    ContactComponent,
    TermsComponent,
    AboutComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DialogModule,
    SlimLoadingBarModule.forRoot(),
    ScheduleModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
    RadioButtonModule,
    TabViewModule,
    MdTabsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    FileUploadModule,
    DataTableModule,
    CheckboxModule,
    CalendarModule,
    DropdownModule,
    ButtonsModule,
    CustomFormsModule,
    BusyModule,
    KSSwiperModule
  ],
  entryComponents:[GroupCreateModal,EventCreateModal],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    AuthGuard,
    Auth,
    DropdownConfig,
    ServiceService,
    EventService,
    GroupService,
    UploadService,
    ArticleService,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

