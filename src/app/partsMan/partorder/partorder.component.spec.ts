import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartorderComponent } from './partorder.component';

describe('PartorderComponent', () => {
  let component: PartorderComponent;
  let fixture: ComponentFixture<PartorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
