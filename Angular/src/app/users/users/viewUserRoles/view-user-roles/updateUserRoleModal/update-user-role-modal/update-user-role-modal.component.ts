import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewUserRolesComponent } from '../../view-user-roles.component';

export interface Role {
  id: number;
  roleName: string;
  accessLevel : string;
}

@Component({
  selector: 'app-update-user-role-modal',
  templateUrl: './update-user-role-modal.component.html',
  styleUrls: ['./update-user-role-modal.component.scss']
})
export class UpdateUserRoleModalComponent {

  roleName: string = '';
  accessLevel: string = '';

  @Output() roleUpdated: EventEmitter<Role> = new EventEmitter<Role>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private dialogRef: MatDialogRef<UpdateUserRoleModalComponent>
  ) {
    this.roleName = data.roleName;
    this.accessLevel = data.accessLevel;
  }

  closeModal() {
    this.dialogRef.close(); // This will close the modal
  }

  updateRole() {
    const roleUpdated: Role = {
      id: this.data.id,
      roleName: this.roleName,
      accessLevel: this.accessLevel
    };
    this.roleUpdated.emit(roleUpdated);
    this.dialogRef.close();
  }
}
