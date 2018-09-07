import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicianDetailComponent } from './technician-detail.component';

describe('TechnicianDetailComponent', () => {
  let component: TechnicianDetailComponent;
  let fixture: ComponentFixture<TechnicianDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicianDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicianDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
