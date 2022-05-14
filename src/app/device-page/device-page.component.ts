import { Component, OnInit, Directive, Input, EventEmitter, Output, ViewChildren, QueryList } from '@angular/core';
import { ApiService, Device, Combos, Combolist, Combo } from '../api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowDown, faArrowUp, faLongArrowAltUp, faQuestionCircle, faThumbsDown, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Title, Meta } from '@angular/platform-browser';
import { Sort } from '@angular/material/sort';
import { faUps } from '@fortawesome/free-brands-svg-icons';
import { stringify } from 'querystring';

@Component({
  selector: 'app-device-page',
  templateUrl: './device-page.component.html',
  styleUrls: ['./device-page.component.css']
})
export class DevicePageComponent implements OnInit {

  combos: Combos;
  device: Device;
  combolists: Combolist[];
  comboloaded: boolean = false;
  deviceloaded: boolean = false;

  error: string;

  searchDLCA: string = '';
  searchDLMIMO: string = '';
  searchULBand: string = '';

  faquestioncircle = faQuestionCircle;
  fanarrowup = faArrowUp;
  fanarrowdown = faArrowDown;

  name: string;
  public deviceName: string;
  public combolistName: string;
  CombolistSelection: string;
  BandFilterSelection: string;

  filteredCombos: Combo[];
  sort: Sort = {
    active: '',
    direction: 'desc'
  };

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta,

  ) {
    //Change old URL to new URL
    route.queryParams.subscribe(params => {
      if (this.deviceName == null && params['model'] != null) {
        this.deviceName = params['model'];
        this.combolistName = params['combolist'];
        if (this.combolistName != null && params['model'] != null) {
          this.router.navigate(['device/' + this.deviceName], {
            queryParams: { combolist: this.combolistName }
          });
        }
        else if (this.deviceName != null && params['model'] != null) {
          this.router.navigate(['device/' + this.deviceName]);
        }
      }
    });
  }

  title: string;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.deviceName = params['deviceName'];
      this.combolistName = params['combolistName'];

      this.route.queryParams.subscribe(params => {
        if (this.deviceName == null && params['model'] != null) {
          this.deviceName = params['model'];

        }

        if (this.combolistName == null)
          this.combolistName = params['combolist'];
      });

      if (this.combolistName == null) {
        this.combolistName = this.route.queryParams['combolist'];
      }
      if (this.combolistName != null) {
        this.changeCombolist(this.combolistName);
      }
      else {
        this.changeCombolist('allcombined');
      }
      this.getDeviceSpecs();
      this.getDeviceCombolist();
      if (this.deviceName != null) {
        this.titleService.setTitle(this.deviceName + ' | 4G/5G Bands & Combos');
        this.metaTagService.updateTag({ name: 'description', content: '4G & 5G Bands, Carrier Aggregation and Dual Connectivity Combinations for ' + this.deviceName });
      }
      else {
        this.titleService.setTitle('Device | 4G/5G Bands & Combos');
        this.metaTagService.updateTag({ name: 'description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });
      }
    });
  }

  get isBrowser(): boolean {
    return this.api.isBrowser;
  }

  getDeviceCombos(): void {
    this.comboloaded = false;
    this.api.getDeviceCombos(this.deviceName)
      .subscribe(combos => { this.combos = combos; this.updateFilteredCombos(); this.comboloaded = true; }, error => this.error = error);
  }

  getDeviceCombosCombolist(): void {
    this.comboloaded = false;
    this.api.getDeviceCombosCombolist(this.deviceName, this.combolistName)
      .subscribe(combos => {
        this.combos = combos;
        this.updateFilteredCombos();
        if (this.combos.status == false) {
          this.combolistName = 'allcombined';
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: { combolist: null },
              queryParamsHandling: 'merge'
            });
          this.changeCombolist(this.combolistName);
        }

        this.comboloaded = true;
      },
        error => this.error = error);
  }

  getDeviceSpecs(): void {
    this.deviceloaded = false;
    this.api.getDeviceSpecs(this.deviceName)
      .subscribe(device => {
        this.device = device.message[0];
        this.deviceloaded = true;
        if (this.device.name == null) {
          this.router.navigate(['']);
        }
        this.titleService.setTitle(this.device.name + ' (' + this.deviceName + ') | 4G/5G Bands & Combos');
        this.metaTagService.updateTag({ name: 'description', content: '4G & 5G Bands, Carrier Aggregation and Dual Connectivity Combinations for ' + this.device.name + ' (' + this.deviceName + ')' });

        this.metaTagService.updateTag({ property: 'og:title', content: this.device.name + ' (' + this.deviceName + ') | 4G/5G Bands & Combos' });
        this.metaTagService.updateTag({ property: 'og:description', content: '4G & 5G Bands, Carrier Aggregation and Dual Connectivity Combinations for ' + this.device.name + ' (' + this.deviceName + ')' });

        this.metaTagService.updateTag({ name: 'twitter:title', content: this.device.name + ' (' + this.deviceName + ') | 4G/5G Bands & Combos' });
        this.metaTagService.updateTag({ name: 'twitter:description', content: '4G & 5G Bands, Carrier Aggregation and Dual Connectivity Combinations for ' + this.device.name + ' (' + this.deviceName + ')' });

      },
        error => this.error = error);
  }

  getDeviceCombolist(): void {
    this.api.getDeviceCombolist(this.deviceName)
      .subscribe(combolists => this.combolists = combolists.message, error => this.error = error);
  }

  sortData(sort: Sort) {
    this.sort = sort;
    this.updateFilteredCombos();
  }

  toggleSort(id: string) {
    if (this.sort.direction == '') {
      this.sortData({
        active: id,
        direction: 'asc'
      });
    }
    else if (this.sort.direction == 'asc') {
      this.sortData({
        active: id,
        direction: 'desc'
      });
    }
    else if (this.sort.direction == 'desc') {
      this.sortData({
        active: id,
        direction: ''
      });
    }
  }

  updateFilteredCombos(): void {
    this.filteredCombos = this.getFilteredCombos();
    if (this.sort != null) {
      if (this.filteredCombos == null) {
        return;
      }
      const data = this.filteredCombos.slice();
      if (!this.sort.active || this.sort.direction === '') {
        this.filteredCombos = data;
        return;
      }
      this.filteredCombos = data.sort((a, b) => {
        const isAsc = this.sort.direction === 'asc';
        switch (this.sort.active) {
          case 'dl_ca': return this.compareCombos(a.dl_ca, b.dl_ca, isAsc);
          case 'dl_streams': return this.compare(a.dl_streams, b.dl_streams, isAsc);
          case 'ul_band': return this.compareCombos(a.ul_band, b.ul_band, isAsc);
          default: return 0;
        }
      });
    }
  }

  compareCombos(a: string, b: string, isAsc: boolean) {
    let aa = a.replace('-', '_').split('_');
    let bb = b.replace('-', '_').split('_');

    for (let i = 0; i < Math.min(aa.length, bb.length); i++) {
      let result = this.compareBands(aa[i], bb[i]);
      if (result != 0)
        return result * (isAsc ? 1 : -1);
    }

    if (aa.length == bb.length)
      return 0;
    else
      return (aa < bb ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareBands(a: string, b: string): number {
    // Tähän band class vertailu myöhemmin

    let aa = 0;
    let bb = 0;

    if (a != '') {
      let aa = Number(a.match(/\d+/g).join(''));
    }
    if (b != '') {
      let bb = Number(b.match(/\d+/g).join(''));
    }

    return (aa < bb ? -1 : 1);
  }


  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  getFilteredCombos(): Combo[] {
    if (this.searchDLCA.length == 0 && this.searchDLMIMO.length == 0 && this.searchULBand.length == 0)
      return this.combos.combos;

    return this.combos.combos.filter(
      d => {
        let found = true;
        if (found && this.searchDLCA.length > 0) {
          found = found && d.dl_ca.toLowerCase().includes(this.searchDLCA.toLowerCase());
        }
        if (found && this.searchDLMIMO.length > 0) {
          found = found && (d.dl_mimo + d.dl_streams).includes(this.searchDLMIMO);
        }
        if (found && this.searchULBand.length > 0) {
          found = found && d.ul_band.toLowerCase().includes(this.searchULBand.toLowerCase());
        }

        return found;
      }
    );
  }

  changeCombolist(combolistName) {
    this.CombolistSelection = combolistName;
    this.combolistName = combolistName;
    if (this.combolistName == 'allcombined' || this.combolistName == '') {
      this.getDeviceCombos();
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { combolist: null },
          queryParamsHandling: 'merge'
        });
    }
    else {
      this.getDeviceCombosCombolist();
      this.router.navigate(
        [],
        {
          relativeTo: this.route,
          queryParams: { combolist: combolistName },
          queryParamsHandling: 'merge'
        });
    }
  }

}

