import { Component, EventEmitter, Output  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-inspection-dialog',
  templateUrl: './delete-inspection-dialog.component.html',
  styleUrls: ['./delete-inspection-dialog.component.scss']
})
export class DeleteInspectionDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeleteInspectionDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
