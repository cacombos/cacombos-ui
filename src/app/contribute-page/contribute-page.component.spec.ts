import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { ContributePageComponent } from './contribute-page.component';

describe('ContributePageComponent', () => {
  let component: ContributePageComponent;
  let fixture: ComponentFixture<ContributePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CookieModule.forRoot(),
        FormsModule
      ],
      declarations: [ ContributePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
