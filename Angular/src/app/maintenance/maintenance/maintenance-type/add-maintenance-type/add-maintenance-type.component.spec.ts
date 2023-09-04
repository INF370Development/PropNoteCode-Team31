import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMaintenanceTypeComponent } from './add-maintenance-type.component';

describe('AddMaintenanceTypeComponent', () => {
  let component: AddMaintenanceTypeComponent;
  let fixture: ComponentFixture<AddMaintenanceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddMaintenanceTypeComponent]
    });
    fixture = TestBed.createComponent(AddMaintenanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
