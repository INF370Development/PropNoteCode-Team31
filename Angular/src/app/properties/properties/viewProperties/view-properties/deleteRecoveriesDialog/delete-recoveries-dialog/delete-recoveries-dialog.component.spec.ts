import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRecoveriesDialogComponent } from './delete-recoveries-dialog.component';

describe('DeleteRecoveriesDialogComponent', () => {
  let component: DeleteRecoveriesDialogComponent;
  let fixture: ComponentFixture<DeleteRecoveriesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteRecoveriesDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteRecoveriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
