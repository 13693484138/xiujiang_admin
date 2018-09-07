import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdepartComponent } from './editdepart.component';

describe('EditdepartComponent', () => {
  let component: EditdepartComponent;
  let fixture: ComponentFixture<EditdepartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdepartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdepartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
