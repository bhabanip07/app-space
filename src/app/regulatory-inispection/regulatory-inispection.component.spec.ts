import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryInispectionComponent } from './regulatory-inispection.component';

describe('RegulatoryInispectionComponent', () => {
  let component: RegulatoryInispectionComponent;
  let fixture: ComponentFixture<RegulatoryInispectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegulatoryInispectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegulatoryInispectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
