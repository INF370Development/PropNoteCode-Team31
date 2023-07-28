import { Component, Output, EventEmitter } from '@angular/core';
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
  selector: 'app-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrls: ['./add-image-modal.component.scss']
})
export class AddImageModalComponent {

  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.imageSelected.emit(selectedFile);
    }
    this.closeModal();
  }

  constructor(private dialogRef: MatDialogRef<AddImageModalComponent>) { }
  
  closeModal() {
    this.dialogRef.close();
  }
}