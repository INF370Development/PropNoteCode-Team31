import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMaintenanceComponent } from './edit-maintenance.component';

describe('EditMaintenanceComponent', () => {
  let component: EditMaintenanceComponent;
  let fixture: ComponentFixture<EditMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMaintenanceComponent]
    });
    fixture = TestBed.createComponent(EditMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
