import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMaintenanceDialogComponent } from './delete-maintenance-dialog.component';

describe('DeleteMaintenanceDialogComponent', () => {
  let component: DeleteMaintenanceDialogComponent;
  let fixture: ComponentFixture<DeleteMaintenanceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteMaintenanceDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteMaintenanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
