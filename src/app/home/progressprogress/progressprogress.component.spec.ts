import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressprogressComponent } from './progressprogress.component';

describe('ProgressprogressComponent', () => {
  let component: ProgressprogressComponent;
  let fixture: ComponentFixture<ProgressprogressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressprogressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
