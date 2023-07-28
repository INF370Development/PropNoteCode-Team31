import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-user-role-dialog',
  templateUrl: './delete-user-role-dialog.component.html',
  styleUrls: ['./delete-user-role-dialog.component.scss']
})
export class DeleteUserRoleDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteUserRoleDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
