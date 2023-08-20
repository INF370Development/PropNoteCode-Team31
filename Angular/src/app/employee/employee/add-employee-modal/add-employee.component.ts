import { Component} from '@angular/core';
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
    FormsModule,
    
  ],
})

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent{
  constructor(private dialogRef: MatDialogRef<AddEmployeeComponent>) { }

  createRole() {
    this.dialogRef.close();
  }
  
  closeModal() {
    this.dialogRef.close();
  }
  }


