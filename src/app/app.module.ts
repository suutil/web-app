import { UIModule } from './ui/ui.module';
import { UiModalModule } from './ui-modal/ui-modal.module';
import { DesignerDashboardModule } from './designer-dashboard/designer-dashboard.module';
import { DisplayShopsModule } from './display-shops/display-shops.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { ProviderDashboardModule } from './provider-dashboard/provider-dashboard.module';
import { BlogModule } from './blog/blog.module';



import { UserProfileModule } from './user-profile/user-profile.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouterModule } from './app-router.module';
import { AppComponent } from './app.component';


import { CoreModule } from 'app/core/core.module';
import { LoginModule } from 'app/login/login.module';
import { HeaderModule } from 'app/header/header.module';

import { SharedModule } from 'app/shared/shared.module'
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar'

// For AoT compiler



@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent
  ],

  entryComponents: [],

  providers: [],

  // Modules
  imports: [
    DesignerDashboardModule,
    AdminDashboardModule,
    ProviderDashboardModule,
    DisplayShopsModule,
    BlogModule,

    BrowserAnimationsModule,
    SharedModule,
    UserProfileModule,
    UIModule,
    UiModalModule,
    SlimLoadingBarModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    CoreModule,
    LoginModule,
    HeaderModule,
    AppRouterModule,
    ToastModule.forRoot()
  ],

  // Main Component
  bootstrap: [AppComponent]
})

export class AppModule {

}
