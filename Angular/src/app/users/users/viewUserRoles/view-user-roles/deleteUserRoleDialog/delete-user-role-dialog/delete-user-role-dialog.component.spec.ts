import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserRoleDialogComponent } from './delete-user-role-dialog.component';

describe('DeleteUserRoleDialogComponent', () => {
  let component: DeleteUserRoleDialogComponent;
  let fixture: ComponentFixture<DeleteUserRoleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserRoleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUserRoleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
