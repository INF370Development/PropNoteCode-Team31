import { Component, EventEmitter, Output  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-tenant-dialog',
  templateUrl: './delete-tenant-dialog.component.html',
  styleUrls: ['./delete-tenant-dialog.component.scss']
})
export class DeleteTenantDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteTenantDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
