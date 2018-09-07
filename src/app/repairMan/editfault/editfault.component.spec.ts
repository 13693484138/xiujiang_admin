import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfaultComponent } from './editfault.component';

describe('EditfaultComponent', () => {
  let component: EditfaultComponent;
  let fixture: ComponentFixture<EditfaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
