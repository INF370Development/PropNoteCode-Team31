import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMaintenanceModalComponent } from './assign-maintenance-modal.component';

describe('AssignMaintenanceModalComponent', () => {
  let component: AssignMaintenanceModalComponent;
  let fixture: ComponentFixture<AssignMaintenanceModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignMaintenanceModalComponent]
    });
    fixture = TestBed.createComponent(AssignMaintenanceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
