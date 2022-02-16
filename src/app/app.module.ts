import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';
import { NgHcaptchaModule } from 'ng-hcaptcha';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2Matomo } from 'angulartics2';
import { TransferHttpCacheModule } from '@nguniversal/common';
import * as Sentry from "@sentry/angular";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './home-page/home-page.component';
import { DevicePageComponent } from './device-page/device-page.component';
import { ContributePageComponent } from './contribute-page/contribute-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SearchPageComponent } from './search-page/search-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { ToastContainerComponent } from './toast-container/toast-container.component';
import { Router } from '@angular/router';
import { TermsPageComponent } from './terms-page/terms-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DevicePageComponent,
    ContributePageComponent,
    FaqPageComponent,
    NotFoundComponent,
    SearchPageComponent,
    PrivacyPageComponent,
    ToastContainerComponent,
    TermsPageComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgxBootstrapMultiselectModule,
    NgHcaptchaModule.forRoot({ siteKey: 'a0ef7bfb-e3de-442c-a326-b30eefb32b2f' }),
    NoopAnimationsModule,
    Angulartics2Module.forRoot({
      developerMode: typeof document == 'undefined' || !environment.production
    }),
    TransferHttpCacheModule,
    CookieModule.forRoot(),
  ],
  providers: [
    CookieService,
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: true,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {},
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
