import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiService, Device } from '../api-service.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchKey: string = '';
  devices: Device[];
  loaded: boolean = false;
  error: string;

  faSearch = faSearch;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private metaTagService: Meta
  ) {
    route.queryParams.subscribe(params => {
      this.searchKey = params['key'];
      this.search();
    })
  };

  ngOnInit(): void {
    this.titleService.setTitle('Search | 4G/5G Bands & Combos');

    this.route.queryParams.subscribe(params => {
      this.searchKey = params['key'];
      this.titleService.setTitle('Search results for ' + this.searchKey + ' | 4G/5G Bands & Combos');
      if (this.searchKey == null) {
        this.router.navigate(['']);
      }
    });

    this.metaTagService.updateTag({ name: 'description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });
    this.search();
  }

  submitForm() {
    if (this.searchKey.length == 0) {
      return false;
    }
    this.router.navigate(['search'], {
      queryParams: { key: this.searchKey }
    });
    this.search();
  }

  search() {
    this.api.getSearchResult(this.searchKey)
      .subscribe(devices => {
        if (devices.message != null) {
          devices.message.sort((a, b) => {
            return a.name == b.name ? 0 : +(a.name > b.name) || -1;
          });
        }


        this.devices = devices.message;
        this.loaded = true;
      },

        error => this.error = error);
  }

}
