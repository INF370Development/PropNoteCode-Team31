import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

NgModule({
  
  imports: [
  BrowserAnimationsModule,
    BrowserModule,
    FormsModule
  ],
})

@Component({
  selector: 'app-create-properties-modal',
  templateUrl: './create-properties-modal.component.html',
  styleUrls: ['./create-properties-modal.component.scss']
})

export class CreatePropertiesModalComponent {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

constructor(private dialogRef: MatDialogRef<CreatePropertiesModalComponent>) { }

createRole() {
  this.dialogRef.close();
}

closeModal() {
  this.dialogRef.close();
}

}
