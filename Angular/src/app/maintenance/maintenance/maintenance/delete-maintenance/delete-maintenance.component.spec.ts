import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintenanceComponent } from './delete-maintenance.component';

describe('DeleteMaintenanceComponent', () => {
  let component: DeleteMaintenanceComponent;
  let fixture: ComponentFixture<DeleteMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMaintenanceComponent]
    });
    fixture = TestBed.createComponent(DeleteMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
