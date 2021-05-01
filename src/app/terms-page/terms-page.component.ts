import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.css']
})
export class TermsPageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Terms of Use | 4G/5G Bands & Combos');
    this.metaTagService.updateTag({property: 'og:title', content: 'Terms of Use | 4G/5G Bands & Combos'});
    this.metaTagService.updateTag({name: 'twitter:title', content: 'Terms of Use | 4G/5G Bands & Combos'});
  }

}
