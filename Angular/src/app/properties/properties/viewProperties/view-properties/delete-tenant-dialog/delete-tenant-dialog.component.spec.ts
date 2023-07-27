import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTenantDialogComponent } from './delete-tenant-dialog.component';

describe('DeleteTenantDialogComponent', () => {
  let component: DeleteTenantDialogComponent;
  let fixture: ComponentFixture<DeleteTenantDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteTenantDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteTenantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
