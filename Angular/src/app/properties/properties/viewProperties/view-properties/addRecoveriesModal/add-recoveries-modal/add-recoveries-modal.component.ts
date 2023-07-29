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
  selector: 'app-add-recoveries-modal',
  templateUrl: './add-recoveries-modal.component.html',
  styleUrls: ['./add-recoveries-modal.component.scss']
})
export class AddRecoveriesModalComponent {

  constructor(private dialogRef: MatDialogRef<AddRecoveriesModalComponent>) { }
  
  closeModal() {
    this.dialogRef.close();
  }
}