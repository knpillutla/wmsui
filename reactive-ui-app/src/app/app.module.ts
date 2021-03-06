import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularWebStorageModule } from 'angular-web-storage';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingpageComponent } from './landingpage/landingpage.component';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angular-6-social-login';
import { UserService } from './services/user.service';
import { WmsTestService } from './services/wmstest.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { AuthGuards } from './auth-guards.services';
import { AuthServices } from './auth.services';
import { AppConstants } from './app.constants';
import { LoginService } from './services/login.service';

import { AgGridModule } from 'ag-grid-angular';
import { GridListComponent } from './grid-list/grid-list.component';
import { ListService } from './services/list.service';
import { SignupComponent } from './signup/signup.component';
import { HeadernavComponent } from './base/headernav/headernav.component';
import { ModalModule } from 'ngx-bootstrap';
import { GridModalComponent } from './grid-list/grid-modal/grid-modal.component';
import { GridService } from './services/grid.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { DetailsModalComponent } from './grid-list/details-modal/details-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { DetailComponent } from './grid-list/detail/detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { WmsTestComponent } from './wmstest/wmstest.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { SearchComponent } from './search/search.component';
import { RfDisplayComponent } from './rf-display/rf-display.component';
import { OtherSettingsComponent } from './user-profile/other-settings/other-settings.component';

// Configs
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(environment.FacebookProvider)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.GoogleProvider)
      },
    ]);
  return config;
}
// Google app registration
// 829933291449-vllt35i1gstpp5mbto59rec5ed62l8o5.apps.googleusercontent.com
// VbcyF0ewlSt6hlbTjSchkckp

// FB App Registration
// 1158385204313646

// 196401391240067

// 998578465163-9rcglq7d6f8aqqt8a4vmfqalvc83rfiu.apps.googleusercontent.com
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingpageComponent,
    NotFoundComponent,
    LoaderComponent,
    GridListComponent,
    SignupComponent,
    HeadernavComponent,
    GridModalComponent,
    ConfirmModalComponent,
    DetailsModalComponent,
    DashboardComponent,
    DetailComponent,
    UserProfileComponent,
    WmsTestComponent,
    ConfigurationComponent,
    DynamicComponent,
    SearchComponent,
    RfDisplayComponent,
    OtherSettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    AgGridModule.withComponents([]),
    AngularWebStorageModule,
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 5000 }), // ToastrModule added,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }, WmsTestService,UserService, LoaderService, AuthGuards, AuthServices, AppConstants, LoginService, ListService, GridService
  ],
  entryComponents: [GridModalComponent, ConfirmModalComponent, DetailsModalComponent, DetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
