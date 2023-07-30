import { Component, EventEmitter, Output  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'app-delete-recoveries-dialog',
  templateUrl: './delete-recoveries-dialog.component.html',
  styleUrls: ['./delete-recoveries-dialog.component.scss']
})
export class DeleteRecoveriesDialogComponent {
  @Output() confirmDelete: EventEmitter<boolean> = new EventEmitter<boolean>();

  onDeleteConfirmed() {
    this.confirmDelete.emit(true);
  }

  onCancel() {
    this.confirmDelete.emit(false);
  }

  constructor(private dialogRef: MatDialogRef<DeleteRecoveriesDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}