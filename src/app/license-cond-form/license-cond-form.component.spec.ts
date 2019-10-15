import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCondFormComponent } from './license-cond-form.component';

describe('LicenseCondFormComponent', () => {
  let component: LicenseCondFormComponent;
  let fixture: ComponentFixture<LicenseCondFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCondFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
