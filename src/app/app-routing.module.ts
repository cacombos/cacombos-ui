import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DevicePageComponent } from './device-page/device-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ContributePageComponent } from './contribute-page/contribute-page.component';
import { FaqPageComponent } from './faq-page/faq-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PrivacyPageComponent } from './privacy-page/privacy-page.component';
import { environment } from 'src/environments/environment';
import { TermsPageComponent } from './terms-page/terms-page.component';


const routes: Routes = [
  { path: 'device/:deviceName/:combolistName', component: DevicePageComponent},
  { path: 'device/:deviceName', component: DevicePageComponent},
  { path: 'device/:deviceName', component: DevicePageComponent, canActivate: [ DevicePageComponent ]},
  { path: 'device', component: DevicePageComponent},
  { path: 'contribute', component: ContributePageComponent},
  { path: 'faq', component: FaqPageComponent},
  { path: 'search', component: SearchPageComponent},
  { path: 'privacy', component: PrivacyPageComponent},
  { path: 'terms', component: TermsPageComponent },
  { path: '', component: HomePageComponent},
  { path: '', component: HomePageComponent, canActivate: [ DevicePageComponent ]},
  { path: '404', component: NotFoundComponent},
  { path: 'login', redirectTo: environment.api_url + '/doLogin' },
  { path: '**', redirectTo: '/404'}
];



@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
