import { Component } from '@angular/core';
import { faSearch, faRss } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { DomSanitizer, SafeUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api-service.service';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Piwik } from 'angulartics2/piwik';
import { isPlatformBrowser } from '@angular/common';
import { ToastServiceService } from './toast-service.service';

declare var _paq: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = '4G/5G Bands & Combos';
  faRss = faRss;
  faSearch = faSearch;
  faTwitter = faTwitter;
  faFacebook = faFacebook;

  navbarCollapsed = true;

  searchKey: string = '';
  login: boolean;
  loginToast: boolean;
  logoutStatus: boolean;
  logoutMessage: string;
  loaded: boolean = false;
  error: string;
  cacheStatus: boolean;
  cacheMessage: string;
  statusHide: boolean = false;
  hideConsent: boolean = false;
  consent: boolean = false;
  showComboCacheClear: boolean = false;

  public deviceName: string;

  public href: SafeUrl;

  public constructor(
    private titleService: Title,
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    public toastService: ToastServiceService,
    private angulartics2Piwik: Angulartics2Piwik,
    private sanitizer:DomSanitizer
  ) {
    if (this.api.isBrowser) {
      angulartics2Piwik.startTracking();
    }
    this.CheckLogin();
    // this.checkConsent();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  get isBrowser(): boolean {
    return this.api.isBrowser;
  }

  ngOnInit() {
    this.updateEdgeLink();
    this.router.events.subscribe((val) => {
      this.updateEdgeLink();
    });
}

  updateEdgeLink() {
    this.href = this.sanitizer.bypassSecurityTrustUrl('microsoft-edge:https://cacombos.com' + this.router.url);
  }

  CheckLogin() {
    this.loaded = false;
    this.api.checkLoginStatus()
      .subscribe(login => {
        this.login = login.status;
        this.loaded = true;
        this.route.queryParams.subscribe(params => {
          if(params['login'] == 'success' && this.login == true && this.api.isBrowser) {
            this.toastService.show('Login Successfull', { classname: 'bg-success text-light', delay: 10000 });
          }
          else if(params['login'] == 'failed' && this.login == false && this.api.isBrowser) {
            this.toastService.show('Login Failed', { classname: 'bg-danger text-light', delay: 10000 });
          }
        });
      },
        error => this.error = error
      );
  }

  doLogout() {
    this.api.doLogout()
      .subscribe(logout => {
        this.logoutStatus = logout.status;
        this.logoutMessage = logout.message;
        this.CheckLogin();
        if(this.logoutStatus == true)
          this.toastService.show(this.logoutMessage, { classname: 'bg-success text-light', delay: 10000 });
        else
          this.toastService.show(this.logoutMessage, { classname: 'bg-danger text-light', delay: 10000 });
      },
        error => this.error = error
      );
  }

  submitForm() {
    if (this.searchKey.length == 0) {
      return false;
    }
    this.router.navigate(['search'], {
      queryParams: { key: this.searchKey }
    });
    this.navbarCollapsed = true;
    this.searchKey = '';
  }

  clearSiteCache(siteName) {
    if (siteName == '')
      siteName = 'all';
    this.api.getClearCache(siteName).subscribe(cache => {
      this.cacheStatus = cache.status;
      this.cacheMessage = cache.message;
      if(this.cacheStatus == true)
        this.toastService.show(this.cacheMessage, { classname: 'bg-success text-light', delay: 10000 });
      else
        this.toastService.show(this.cacheMessage, { classname: 'bg-danger text-light', delay: 10000 });
    },
      error => this.error = error
    );
  }

  closeAlert() {
    this.statusHide = true;
  }

  // Consent

  checkConsent() {
    if (this.api.getCookie('mtm_consent')) {
      this.hideConsent = true;
      this.consent = true;
    }
    if (this.api.getCookie('mtm_consent_removed') || this.api.getCookie('deny_consent')) {
      this.hideConsent = true;
      this.consent = false;
    }
  }

  public acceptConsent() {
    if (typeof _paq !== 'undefined') {
      _paq.push(['rememberCookieConsentGiven']);
      this.api.eraseCookie('deny_consent');
      this.api.eraseCookie('mtm_consent_removed');
      this.hideConsent = true;
    }
  }
  public denyConsent() {
    if (typeof _paq !== 'undefined') {
      _paq.push(['forgetCookieConsentGiven']);
      this.hideConsent = true;
      this.api.setCookie('deny_consent', '1', 360);
    }
  }

}
