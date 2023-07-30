import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewUsersComponent } from '../../view-users.component';

export interface User {
  id: number;
  email: string;
  userRole: string;
}

@Component({
  selector: 'app-update-user-modal',
  templateUrl: './update-user-modal.component.html',
  styleUrls: ['./update-user-modal.component.scss']
})

export class UpdateUserModalComponent {
  email: string = '';
  userRole: string = '';

  @Output() userUpdated: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private dialogRef: MatDialogRef<UpdateUserModalComponent>
  ) {
    this.email = data.email;
    this.userRole = data.userRole;
  }

  closeModal() {
    this.dialogRef.close(); // This will close the modal
  }

  updateUser() {
    const updatedUser: User = {
      id: this.data.id,
      email: this.email,
      userRole: this.userRole
    };
    this.userUpdated.emit(updatedUser);
    this.dialogRef.close();
  }
}