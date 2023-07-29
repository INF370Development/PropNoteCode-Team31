import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBrokerComponent } from './view-broker.component';

describe('ViewBrokerComponent', () => {
  let component: ViewBrokerComponent;
  let fixture: ComponentFixture<ViewBrokerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewBrokerComponent]
    });
    fixture = TestBed.createComponent(ViewBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
