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
  selector: 'app-add-tenant-modal',
  templateUrl: './add-tenant-modal.component.html',
  styleUrls: ['./add-tenant-modal.component.scss']
})
export class AddTenantModalComponent {

  constructor(private dialogRef: MatDialogRef<AddTenantModalComponent>) { }
  
  closeModal() {
    this.dialogRef.close();
  }
}