import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceStatusComponent } from './edit-maintenance-status.component';

describe('EditMaintenanceStatusComponent', () => {
  let component: EditMaintenanceStatusComponent;
  let fixture: ComponentFixture<EditMaintenanceStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaintenanceStatusComponent]
    });
    fixture = TestBed.createComponent(EditMaintenanceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
