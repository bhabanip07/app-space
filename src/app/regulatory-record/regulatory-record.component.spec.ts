import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryRecordComponent } from './regulatory-record.component';

describe('RegulatoryRecordComponent', () => {
  let component: RegulatoryRecordComponent;
  let fixture: ComponentFixture<RegulatoryRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatoryRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
