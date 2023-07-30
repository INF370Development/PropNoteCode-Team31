import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrokerModalComponent } from './create-broker-modal.component';

describe('CreatePropertiesModalComponent', () => {
  let component: CreateBrokerModalComponent;
  let fixture: ComponentFixture<CreateBrokerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBrokerModalComponent],
    });
    fixture = TestBed.createComponent(CreateBrokerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
