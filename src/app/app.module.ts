import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { MdTabsModule } from '@angular2-material/tabs';
import { Overlay } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap/index';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Home } from './home';
import { About } from './about';
import { NoContent } from './no-content';
import { XLarge } from './home/x-large';


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

import { DialogModule } from 'primeng/primeng';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ScheduleModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ModalModule } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { GroupModal } from './components/modal/group-modal';
import { GroupCreateModal } from './components/modal/group-create-modal';
import { FileUploadModule } from 'ng2-file-upload/components/file-upload/file-upload.module';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ 
    App
  ],
  declarations: [
    App,
    About,
    Home,
    NoContent,
    XLarge,
    ActivityComponent,
    ProductComponent,
    GroupComponent,
    LoginComponent,
    RegisterComponent,
    CenterComponent,
    AccountComponent,
    CompanyComponent,
    CoProductsComponent,
    OrderComponent,
    ProfileComponent,
    SecurityComponent,
    MessageComponent,
    GroupModal,
    GroupCreateModal
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    DialogModule,
    SlimLoadingBarModule.forRoot(),
    ScheduleModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    RadioButtonModule,
    MdTabsModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    FileUploadModule,
    DataTableModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    Modal,
    Overlay,
    BootstrapModalModule.getProviders()
  ],
  entryComponents: [ GroupModal, GroupCreateModal ]
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

