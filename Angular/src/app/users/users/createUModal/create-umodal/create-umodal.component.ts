import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  selector: 'app-create-umodal',
  templateUrl: './create-umodal.component.html',
  styleUrls: ['./create-umodal.component.scss']
})

export class CreateUModalComponent {
  email: string = '';
  userRole: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateUModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal() {
    this.dialogRef.close();
  }

  createUser(): void {
    this.dialogRef.close({ email: this.email, userRole: this.userRole });
  }
}
