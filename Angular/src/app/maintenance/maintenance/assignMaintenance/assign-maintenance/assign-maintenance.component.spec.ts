import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMaintenanceComponent } from './assign-maintenance.component';

describe('AssignMaintenanceComponent', () => {
  let component: AssignMaintenanceComponent;
  let fixture: ComponentFixture<AssignMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignMaintenanceComponent]
    });
    fixture = TestBed.createComponent(AssignMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
