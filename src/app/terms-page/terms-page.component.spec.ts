import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CookieModule } from 'ngx-cookie';
import { AppComponent } from '../app.component';

import { TermsPageComponent } from './terms-page.component';

describe('TermsPageComponent', () => {
  let component: TermsPageComponent;
  let fixture: ComponentFixture<TermsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        CookieModule.forRoot(),
      ],
      declarations: [ TermsPageComponent ],
      providers: [
        AppComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
