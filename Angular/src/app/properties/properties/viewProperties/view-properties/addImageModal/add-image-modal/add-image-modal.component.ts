import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrls: ['./add-image-modal.component.scss']
})
export class AddImageModalComponent {
  @Output() imageUploaded = new EventEmitter<void>();
  fileName = '';
  fileUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null; // Add this variable


  constructor(
    public dialogRef: MatDialogRef<AddImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { propertyID: number },
    private _propertiesService: PropertiesService,
    private http: HttpClient,
  ) {}

  onFileSelected(event: any)  {
    event.preventDefault();
    this.selectedFile = event.target.files[0]; // Save the selected file

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (this.selectedFile) {
      // Check if the selected file type is in the allowed image types
      if (allowedImageTypes.includes(this.selectedFile.type)) {
        this.selectedFile = this.selectedFile;
        this.fileName = this.selectedFile.name;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileUrl = e.target.result;
        };
        reader.readAsDataURL(this.selectedFile);
      } else {
        // Display an error message or handle the case where the file type is not allowed
        console.error('Invalid file type. Please select a valid image file (JPEG, PNG, GIF).');
      }
    }
  }
  closeModal() {
    this.dialogRef.close();
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append("photo", this.selectedFile, this.selectedFile.name);
debugger;
      console.log("Image", formData)
      const upload$ = this._propertiesService.uploadPropertyImage(this.data.propertyID, formData);

      upload$.subscribe(
        response => {
          // Handle successful response
          this.imageUploaded.emit();
          this.dialogRef.close();
          location.reload();
        },
        error => {
          console.error('Error uploading image:', error);
          // Handle error
        }
      );
    }
  }
}
