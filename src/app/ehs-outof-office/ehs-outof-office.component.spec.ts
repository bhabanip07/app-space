import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EhsOutofOfficeComponent } from './ehs-outof-office.component';

describe('EhsOutofOfficeComponent', () => {
  let component: EhsOutofOfficeComponent;
  let fixture: ComponentFixture<EhsOutofOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EhsOutofOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EhsOutofOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
