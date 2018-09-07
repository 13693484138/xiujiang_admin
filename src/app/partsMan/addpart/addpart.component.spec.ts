import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpartComponent } from './addpart.component';

describe('AddpartComponent', () => {
  let component: AddpartComponent;
  let fixture: ComponentFixture<AddpartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
