import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDocComponent } from './contact-doc.component';

describe('ContactDocComponent', () => {
  let component: ContactDocComponent;
  let fixture: ComponentFixture<ContactDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
