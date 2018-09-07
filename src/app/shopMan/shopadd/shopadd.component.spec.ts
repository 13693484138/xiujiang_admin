import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopaddComponent } from './shopadd.component';

describe('ShopaddComponent', () => {
  let component: ShopaddComponent;
  let fixture: ComponentFixture<ShopaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
