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
  selector: 'app-create-urmodal',
  templateUrl: './create-urmodal.component.html',
  styleUrls: ['./create-urmodal.component.scss']
})

export class CreateURModalComponent {
  roleName: string = '';
  accessLevel: string = '';

constructor(
  public dialogRef: MatDialogRef<CreateURModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  createUserRole(): void {
    this.dialogRef.close({ roleName: this.roleName, accessLevel: this.accessLevel });
  }

  closeModal() {
    this.dialogRef.close();
  }
}
