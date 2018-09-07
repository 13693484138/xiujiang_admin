import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartclassComponent } from './addpartclass.component';

describe('AddpartclassComponent', () => {
  let component: AddpartclassComponent;
  let fixture: ComponentFixture<AddpartclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpartclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
