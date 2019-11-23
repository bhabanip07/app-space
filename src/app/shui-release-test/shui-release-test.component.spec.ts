import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuiReleaseTestComponent } from './shui-release-test.component';

describe('ShuiReleaseTestComponent', () => {
  let component: ShuiReleaseTestComponent;
  let fixture: ComponentFixture<ShuiReleaseTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuiReleaseTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuiReleaseTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
