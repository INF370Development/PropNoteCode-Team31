import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-delete-contracor-dialog',
  templateUrl: './delete-contracor-dialog.component.html',
  styleUrls: ['./delete-contracor-dialog.component.scss']
})
export class DeleteContracorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteContracorDialogComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closeModal() {
    this.dialogRef.close();
  }
}
