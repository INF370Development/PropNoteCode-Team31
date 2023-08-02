import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokercreatemodelComponent } from './brokercreatemodel.component';

describe('BrkercreatemodelComponent', () => {
  let component: BrokercreatemodelComponent;
  let fixture: ComponentFixture<BrokercreatemodelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrokercreatemodelComponent]
    });
    fixture = TestBed.createComponent(BrokercreatemodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
