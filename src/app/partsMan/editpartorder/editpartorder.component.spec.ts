import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpartorderComponent } from './editpartorder.component';

describe('EditpartorderComponent', () => {
  let component: EditpartorderComponent;
  let fixture: ComponentFixture<EditpartorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpartorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpartorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
