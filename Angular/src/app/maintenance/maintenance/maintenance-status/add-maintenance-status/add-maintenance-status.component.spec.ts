import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceStatusComponent } from './add-maintenance-status.component';

describe('AddMaintenanceStatusComponent', () => {
  let component: AddMaintenanceStatusComponent;
  let fixture: ComponentFixture<AddMaintenanceStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaintenanceStatusComponent]
    });
    fixture = TestBed.createComponent(AddMaintenanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
