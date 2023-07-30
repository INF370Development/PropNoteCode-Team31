import { Component, EventEmitter, Output  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-property-dialog',
  templateUrl: './delete-property-dialog.component.html',
  styleUrls: ['./delete-property-dialog.component.scss']
})
export class DeletePropertyDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeletePropertyDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
