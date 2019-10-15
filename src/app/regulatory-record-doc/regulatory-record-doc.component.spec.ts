import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryRecordDocComponent } from './regulatory-record-doc.component';

describe('RegulatoryRecordDocComponent', () => {
  let component: RegulatoryRecordDocComponent;
  let fixture: ComponentFixture<RegulatoryRecordDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatoryRecordDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryRecordDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
