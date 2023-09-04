import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceTypeComponent } from './edit-maintenance-type.component';

describe('EditMaintenanceTypeComponent', () => {
  let component: EditMaintenanceTypeComponent;
  let fixture: ComponentFixture<EditMaintenanceTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaintenanceTypeComponent]
    });
    fixture = TestBed.createComponent(EditMaintenanceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
