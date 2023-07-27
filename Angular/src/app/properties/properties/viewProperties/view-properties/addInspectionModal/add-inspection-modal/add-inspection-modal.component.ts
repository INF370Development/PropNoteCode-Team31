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
  selector: 'app-add-inspection-modal',
  templateUrl: './add-inspection-modal.component.html',
  styleUrls: ['./add-inspection-modal.component.scss']
})
export class AddInspectionModalComponent {

  constructor(private dialogRef: MatDialogRef<AddInspectionModalComponent>) { }
  
closeModal() {
  this.dialogRef.close();
}
}