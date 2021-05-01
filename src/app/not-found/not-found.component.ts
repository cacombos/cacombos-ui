import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotFoundService } from './not-found.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private titleService: Title,
    private notFoundService: NotFoundService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('404 | 4G/5G Bands & Combos');
    this.notFoundService.setStatus(404, 'Not Found');
  }

}
