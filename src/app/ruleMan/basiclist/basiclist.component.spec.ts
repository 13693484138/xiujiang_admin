import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasiclistComponent } from './basiclist.component';

describe('BasiclistComponent', () => {
  let component: BasiclistComponent;
  let fixture: ComponentFixture<BasiclistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasiclistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasiclistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
