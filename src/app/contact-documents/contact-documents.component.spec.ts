import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDocumentsComponent } from './contact-documents.component';

describe('ContactDocumentsComponent', () => {
  let component: ContactDocumentsComponent;
  let fixture: ComponentFixture<ContactDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
