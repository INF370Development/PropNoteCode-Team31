import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerModelComponent } from './broker-model.component';

describe('BrokerModelComponent', () => {
  let component: BrokerModelComponent;
  let fixture: ComponentFixture<BrokerModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrokerModelComponent]
    });
    fixture = TestBed.createComponent(BrokerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
