import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartclassComponent } from './partclass.component';

describe('PartclassComponent', () => {
  let component: PartclassComponent;
  let fixture: ComponentFixture<PartclassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartclassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
