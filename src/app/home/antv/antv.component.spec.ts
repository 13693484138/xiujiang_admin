import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntvComponent } from './antv.component';

describe('AntvComponent', () => {
  let component: AntvComponent;
  let fixture: ComponentFixture<AntvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
