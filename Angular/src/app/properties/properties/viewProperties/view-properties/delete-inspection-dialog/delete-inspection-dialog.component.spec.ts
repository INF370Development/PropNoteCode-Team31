import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInspectionDialogComponent } from './delete-inspection-dialog.component';

describe('DeleteInspectionDialogComponent', () => {
  let component: DeleteInspectionDialogComponent;
  let fixture: ComponentFixture<DeleteInspectionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteInspectionDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteInspectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
