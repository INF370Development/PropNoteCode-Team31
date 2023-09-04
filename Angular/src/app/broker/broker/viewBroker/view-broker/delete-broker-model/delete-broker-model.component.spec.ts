import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBrokerModelComponent } from './delete-broker-model.component';

describe('DeleteBrokerModelComponent', () => {
  let component: DeleteBrokerModelComponent;
  let fixture: ComponentFixture<DeleteBrokerModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteBrokerModelComponent]
    });
    fixture = TestBed.createComponent(DeleteBrokerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
