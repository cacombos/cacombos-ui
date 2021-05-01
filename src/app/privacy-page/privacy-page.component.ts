import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

declare var _paq: any;

@Component({
  selector: 'app-privacy-page',
  templateUrl: './privacy-page.component.html',
  styleUrls: ['./privacy-page.component.css']
})
export class PrivacyPageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private appComponent: AppComponent,
  ) { }

  denyConsentDisable: boolean;
  allowConsentDisable: boolean;
  consent: boolean;


  ngOnInit(): void {
    this.titleService.setTitle('Privacy | 4G/5G Bands & Combos');
    this.metaTagService.updateTag({ property: 'og:title', content: 'Privacy | 4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ name: 'twitter:title', content: 'Privacy | 4G/5G Bands & Combos' });
    // this.checkConsent();
  }

  checkConsent() {
    this.consent = this.appComponent.consent;
  }

  acceptConsent(): void {
    this.appComponent.acceptConsent();
    this.allowConsentDisable = true;
    this.consent = true;
  }
  denyConsent(): void {
    this.appComponent.denyConsent();
    this.denyConsentDisable = true;
    this.consent = false;
  }
}
