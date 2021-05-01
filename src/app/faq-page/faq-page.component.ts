import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent implements OnInit {

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('FAQ | 4G/5G Bands & Combos');

    this.metaTagService.updateTag({ name: 'description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ property: 'og:title', content: 'FAQ | 4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ property: 'og:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });

    this.metaTagService.updateTag({ name: 'twitter:title', content: 'FAQ | 4G/5G Bands & Combos' });
    this.metaTagService.updateTag({ name: 'twitter:description', content: 'Check your device 4G and 5G Bands, Carrier Aggregation and Dual Connectivity Combinations here' });
  }

}
