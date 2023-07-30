import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';

NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatFormFieldModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
});

@Component({
  selector: 'app-create-broker-modal',
  templateUrl: './create-broker-modal.component.html',
  styleUrls: ['./create-broker-modal.component.scss'],
})
export class CreateBrokerModalComponent {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  constructor(private dialogRef: MatDialogRef<CreateBrokerModalComponent>) {}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
