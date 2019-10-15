import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseConditionDocumentsComponent } from './license-condition-documents.component';

describe('LicenseConditionDocumentsComponent', () => {
  let component: LicenseConditionDocumentsComponent;
  let fixture: ComponentFixture<LicenseConditionDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseConditionDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseConditionDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
