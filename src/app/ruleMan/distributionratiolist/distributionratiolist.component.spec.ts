import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionratiolistComponent } from './distributionratiolist.component';

describe('DistributionratiolistComponent', () => {
  let component: DistributionratiolistComponent;
  let fixture: ComponentFixture<DistributionratiolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributionratiolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributionratiolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
