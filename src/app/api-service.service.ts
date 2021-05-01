import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../environments/environment';
import { ContributeForm } from './contribute-page/contribute-page.component';
import { isPlatformBrowser } from '@angular/common';
import { CookieService, CookieOptions } from 'ngx-cookie';

export interface ApiResult<T> {
  message: T;
  status: boolean;
}

export interface DefaultApiResult {
  message: string;
  status: boolean;
}

export interface Device {
  model: string;
  name: string;
  modem: string;
  firmware: string;
  release_year: string;
  lte_dl_modulation: number;
  lte_ul_modulation: number;
  lte_dl_category: number;
  lte_ul_category: number;
  lte_dl_speed: number;
  lte_ul_speed: number;
  nr_dl_modulation?: string;
  nr_ul_modulation?: string;
  nr_nsa: boolean;
  bands: Bands;
  notes: string;
  hidden?: boolean;
  no_lteband_cp?: boolean;
  dbBands?: BandsDB;
}

export interface Combo {
  dl_ca: string;
  dl_mimo: string;
  dl_streams: number;
  ul_band: string;
  ul_streams?: any;
  notes: string;
}

export interface BandsDB {
  lte: string;
  nr: string;
}

export interface Bands {
  lte: string[];
  lte_4t4r: string[],
  nr_nsa: string[];
  nr_sa?: any;
}

export interface Combos {
  status: boolean;
  combos: Combo[];
  bands: Bands;
  source: string;
  notes: string;
}

export interface RawCombos {
  combos: string[];
}

export interface Combolist {
  combolist: string;
  frendly_name: string;
  plmns: string;
}

export interface ContributeResult {
  status: boolean;
  message: string[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiUrl = environment.api_url;

  public deviceName: string;
  public combolistName: string;

  public searchKey: string;

  public isBrowser: boolean;

  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (!this.isBrowser) {
      this.headers.append('X-Api-Request', '1');
    }
  }

  // Check Login
  checkLoginStatus(): Observable<ContributeResult> {
    return this.doApiGet<ContributeResult>(this.apiUrl + '/getLoginStatus', true);
  }
  // Logout current session
  doLogout(): Observable<DefaultApiResult> {
    return this.doApiGet<DefaultApiResult>(this.apiUrl + '/doLogout', true);
  }

  //Get data from API
  getDevices(): Observable<ApiResult<Device[]>> {
    return this.doApiGet<ApiResult<Device[]>>(this.apiUrl + '/getDevices?cache=true', true);
  }

  getDeviceSpecs(deviceName): Observable<ApiResult<Device[]>> {
    return this.doApiGet<ApiResult<Device[]>>(this.apiUrl + '/getDevices?cache=true&model=' + deviceName, true);
  }

  getDeviceCombos(deviceName): Observable<Combos> {
    return this.doApiGet<Combos>(this.apiUrl + '/getCombos?cache=true&model=' + deviceName);
  }

  getDeviceCombosCombolist(deviceName, combolistName): Observable<Combos> {
    return this.doApiGet<Combos>(this.apiUrl + '/getCombos?cache=true&model=' + deviceName + '&combolist=' + combolistName);
  }

  getRawCombosCombolist(deviceName, combolistName): Observable<ApiResult<RawCombos>> {
    return this.doApiGet<ApiResult<RawCombos>>(this.apiUrl + '/getRawCombos?cache=true&model=' + deviceName + '&combolist=' + combolistName, true);
  }

  getDeviceCombolist(deviceName): Observable<ApiResult<Combolist[]>> {
    return this.doApiGet<ApiResult<Combolist[]>>(this.apiUrl + '/getCombolist?cache=true&model='+ deviceName);
  }

  getAllDeviceCombolist(): Observable<ApiResult<Combolist[]>> {
    return this.doApiGet<ApiResult<Combolist[]>>(this.apiUrl + '/getCombolist?cache=true');
  }

  getSearchResult(searchKey): Observable<ApiResult<Device[]>> {
    return this.doApiGet<ApiResult<Device[]>>(this.apiUrl + '/getSearchResult?key=' + searchKey);
  }

  getClearCache(siteName, deviceName?): Observable<DefaultApiResult> {
    return this.doApiGet<DefaultApiResult>(this.apiUrl + '/getClearCache?site=' + siteName + '&model=' + deviceName, true);
  }

  doApiGet<T>(url: string, withCredentials: boolean = false): Observable<T> {
    return this.http.get<T>(url, { withCredentials: withCredentials, headers: this.headers })
      .pipe(
        catchError(this.handleError())
      );
  }

  PostContributeForm(fileToUpload: File, form: ContributeForm): Observable<ContributeResult> {
    const endpoint = this.apiUrl + '/postMessage';
    const formData: FormData = new FormData();
    if (fileToUpload != null)
      formData.append('fileKey', fileToUpload, fileToUpload.name);
    formData.append('form', JSON.stringify(form));
    return this.http.post<ContributeResult>(endpoint, formData)
      .pipe(
        retry(1),
        catchError(this.handleError())
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError() {
    return (error: any): Observable<any> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      return throwError(
        'Something bad happened; please try again later.');
    };
  }

  /** Log a ApiService message with the MessageService */
  private log(message: string) {
    console.log(`ApiService: ${message}`);
  }

  public setCookie(name: string, value: string, days: number) {
    let cookieOpts: CookieOptions = {};
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      cookieOpts.expires = date;
    }
    this.cookieService.put(name, value, cookieOpts);
  }

  public getCookie(name: string): string {
    return this.cookieService.get(name);
  }

  public eraseCookie(name: string) {
    this.cookieService.remove(name);
  }


}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/