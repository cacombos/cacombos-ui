import { Component, OnInit } from '@angular/core';
import { ApiService, Device } from '../api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { IMultiSelectSettings, IMultiSelectTexts } from 'ngx-bootstrap-multiselect';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { debug } from 'console';


declare interface BandInfo {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  // Change View icon
  fasList = faList;
  // Change View boolean
  show: boolean = false;

  error: string;
  filterNR: boolean;
  LTEBandFilterSelection: number[];
  NRBandFilterSelection: number[];
  LTEcategoryfilterSelection: number[];
  loaded: boolean = false;
  deviceCount: any;

  devices: Device[] = [];
  filteredDevices: Device[] = [];
  searchText: string = "";
  LTEbandfilterList: BandInfo[] = [
    { id: 1, name: 'B1 2100 MHz' },
    { id: 2, name: 'B2 1900 MHz' },
    { id: 3, name: 'B3 1800 MHz' },
    { id: 4, name: 'B4 1700/2100 MHz' },
    { id: 5, name: 'B5 850 MHz' },
    { id: 7, name: 'B7 2600 MHz' },
    { id: 8, name: 'B8 900 Mhz' },
    { id: 11, name: 'B11 1500 MHz Lower' },
    { id: 12, name: 'B12 700 MHz a' },
    { id: 13, name: 'B13 700 MHz c' },
    { id: 14, name: 'B14 700 MHz PS' },
    { id: 17, name: 'B17 700 MHz b' },
    { id: 18, name: 'B18 800 MHz Lower' },
    { id: 19, name: 'B19 800 MHz Upper' },
    { id: 20, name: 'B20 800 MHz DD' },
    { id: 21, name: 'B21 1500 MHz Upper' },
    { id: 25, name: 'B25 2500 MHz' },
    { id: 26, name: 'B26 850 MHz' },
    { id: 28, name: 'B28 700 MHz' },
    { id: 29, name: 'B29 700 MHz SDL' },
    { id: 30, name: 'B30 2300 MHz WCS' },
    { id: 32, name: 'B32 1500 MHz SDL' },
    { id: 34, name: 'B34 2000 MHz TDD' },
    { id: 38, name: 'B38 2600 MHz TDD' },
    { id: 39, name: 'B39 1900 MHz TDD' },
    { id: 40, name: 'B40 2300 MHz TDD' },
    { id: 41, name: 'B41 2600 MHz TDD' },
    { id: 42, name: 'B42 3500 MHz TDD' },
    { id: 43, name: 'B43 3700 MHz TDD' },
    { id: 46, name: 'B46 5 GHz TDD' },
    { id: 48, name: 'B48 3600 MHz TDD' },
    { id: 66, name: 'B66 1700/2100 MHz' },
    { id: 71, name: 'B71 600 MHz' },
    { id: 252, name: 'B252 5200 MHz LTE-U' },
    { id: 255, name: 'B255 5700 MHz LTE-U' },
  ];

  NRbandfilterList: BandInfo[] = [
    { id: 1, name: 'N1 2100 MHz' },
    { id: 2, name: 'N2 1900 MHz' },
    { id: 3, name: 'N3 1800 MHz' },
    { id: 5, name: 'N5 850 MHz' },
    { id: 7, name: 'N7 2600 MHz' },
    { id: 8, name: 'N8 900 MHz' },
    { id: 12, name: 'N12 700 MHz a' },
    { id: 13, name: 'N13 700 MHz c' },
    { id: 14, name: 'N14 700 MHz PS' },
    { id: 18, name: 'N18 800 MHz Lower' },
    { id: 20, name: 'N20 800 MHz' },
    { id: 25, name: 'N25 1900 MHz' },
    { id: 26, name: 'N26 850 MHz' },
    { id: 28, name: 'N28 700 MHz' },
    { id: 30, name: 'N30 2300 MHz' },
    { id: 38, name: 'N38 2600 MHz TDD' },
    { id: 39, name: 'N39 1900 MHz TDD' },
    { id: 40, name: 'N40 2300 MHz TDD' },
    { id: 41, name: 'N41 2600 MHz TDD' },
    { id: 48, name: 'N48 3600 MHz TDD' },
    { id: 53, name: 'N53 2500 MHz TDD' },
    { id: 66, name: 'N66 1700/2100 MHz' },
    { id: 71, name: 'N71 600 MHz' },
    { id: 77, name: 'N77 3.7 GHz' },
    { id: 78, name: 'N78 3.5 GHz' },
    { id: 79, name: 'N79 4.9 GHz' },
    { id: 80, name: 'N80 1800 MHz SUL' },
    { id: 84, name: 'N84 2100 MHz SUL' },
    { id: 257, name: 'N257 28 GHz' },
    { id: 258, name: 'N258 26 GHz' },
    { id: 259, name: 'N259 41 GHz' },
    { id: 260, name: 'N260 39 GHz' },
    { id: 261, name: 'N261 28 GHz US' },
  ];

  LTEcategoryfilterList: BandInfo[] = [
    { id: 4, name: '4 - 150M / 50 Mbps' },
    { id: 6, name: '6 - 300M / 50 Mbps' },
    { id: 7, name: '7 - 300 / 100 Mbps' },
    { id: 9, name: '9 - 450 / 50 Mbps' },
    { id: 11, name: '11 - 600 / 50 Mbps' },
    { id: 12, name: '12 - 600 / 150 Mbps' },
    { id: 13, name: '13 - 400 / 150 Mbps' },
    { id: 15, name: '15 - 800 Mbps' },
    { id: 16, name: '16 - 1000 Mbps' },
    { id: 18, name: '18 - 1200 Mbps' },
    { id: 19, name: '19 - 1600 Mbps' },
    { id: 20, name: '20 - 2000 Mbps' },
    { id: 21, name: '21 - 1500 Mbps' },
  ];

  bandfilterSettings: IMultiSelectSettings = {
    enableSearch: false,
    checkedStyle: 'fontawesome',
    displayAllSelectedText: true,
    dynamicTitleMaxItems: 1,
    fixedTitle: false
  };

  ltebandfilterTexts: IMultiSelectTexts = {
    defaultTitle: '4G Band Filter'
  };

  nrbandfilterTexts: IMultiSelectTexts = {
    defaultTitle: '5G Band Filter'
  };

  catfilterTexts: IMultiSelectTexts = {
    defaultTitle: 'LTE Category Filter'
  };

  constructor(
    private api: ApiService,
    private titleService: Title,
    private metaTagService: Meta,
  ) { }

  ngOnInit(): void {
    this.getDevices();
    this.getViewCookie();

    this.titleService.setTitle('4G/5G Bands & Combos');

    this.metaTagService.updateTag({ name: 'description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ property: 'og:title', content: '4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ property: 'og:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ name: 'twitter:title', content: '4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ name: 'twitter:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });
  }

  get isBrowser(): boolean {
    return this.api.isBrowser;
  };

  getDevices(): void {
    this.loaded = false;
    this.api.getDevices()
      .subscribe(devices => { this.devices = devices.message; this.updateFilters(); this.loaded = true; }, error => this.error = error);
  };

  updateFilters(): void {
    this.filteredDevices = this.getFilteredDevices();
  };

  getFilteredDevices() {
    if (this.searchText.length == 0 && !this.filterNR && !this.LTEBandFilterSelection && !this.NRBandFilterSelection && !this.LTEcategoryfilterSelection) {
      if (this.devices.filter(d => d.lte_dl_category != 4))
        return this.devices;
    }
    return this.devices.filter(d => {
      if (this.filterNR && !d.nr_nsa) {
        return false;
      }
      if (this.LTEBandFilterSelection != null) {
        if (this.LTEBandFilterSelection.length > 0 && d.bands.lte == null) {
          return false;
        }
        if (!this.LTEBandFilterSelection.every(b => (d.bands.lte.includes(b.toString())))) {
          return false;
        }
      }
      if (this.NRBandFilterSelection != null) {
        if (this.NRBandFilterSelection.length > 0 && d.bands.nr_nsa == null) {
          return false;
        }
        if (!this.NRBandFilterSelection.every(b => (d.bands.nr_nsa.includes(b.toString())))) {
          return false;
        }
      }
      if (this.LTEcategoryfilterSelection != null && this.LTEcategoryfilterSelection.length > 0) {
        if (!this.LTEcategoryfilterSelection.includes(Number(d.lte_dl_category))) {
          return false;
        }
      }

      return (d.name + d.model + d.modem + d.release_year).toLowerCase().includes(this.searchText.toLowerCase())
    }
    );
  }

  setViewCookie(show) {
    this.api.setCookie('show', show, 30);
  }

  getViewCookie() {
    this.show = false;
    if (this.api.getCookie('show') == 'true') {
      this.show = true;
    }
  }
  getRowsCount() {
    this.deviceCount = this.filteredDevices.length;
  }

}
