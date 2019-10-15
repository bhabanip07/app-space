import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryInispectionDocComponent } from './regulatory-inispection-doc.component';

describe('RegulatoryInispectionDocComponent', () => {
  let component: RegulatoryInispectionDocComponent;
  let fixture: ComponentFixture<RegulatoryInispectionDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatoryInispectionDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryInispectionDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
