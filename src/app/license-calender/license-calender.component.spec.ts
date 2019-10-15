import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCalenderComponent } from './license-calender.component';

describe('LicenseCalenderComponent', () => {
  let component: LicenseCalenderComponent;
  let fixture: ComponentFixture<LicenseCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
