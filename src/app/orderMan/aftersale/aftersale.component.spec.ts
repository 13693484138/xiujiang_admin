import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AftersaleComponent } from './aftersale.component';

describe('AftersaleComponent', () => {
  let component: AftersaleComponent;
  let fixture: ComponentFixture<AftersaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AftersaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AftersaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
