import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultlistComponent } from './faultlist.component';

describe('FaultlistComponent', () => {
  let component: FaultlistComponent;
  let fixture: ComponentFixture<FaultlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
