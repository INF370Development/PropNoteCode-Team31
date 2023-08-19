import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PropertiesService } from 'src/app/services/properties.service';

@Component({
  selector: 'app-add-image-modal',
  templateUrl: './add-image-modal.component.html',
  styleUrls: ['./add-image-modal.component.scss']
})
export class AddImageModalComponent {
  fileName = '';

  constructor(
    public dialogRef: MatDialogRef<AddImageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { propertyId: number }, // Inject propertyId
    private _propertiesService: PropertiesService,
    private http: HttpClient,
  ) {}

  onFileSelected(event: any)  {
    event.preventDefault();
    const file:File = event.target.files[0];
console.log('Files:', file)
    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);

        const upload$ = this._propertiesService.uploadPropertyImage(this.data.propertyId, formData)

        upload$.subscribe();
    }
}
}

//   uploadImage(event: Event): void {
//     event.preventDefault();
//     console.log('Upload button clicked.');
// debugger;
//     const imageInput = event.target as HTMLInputElement;
//     console.log('Selected files:', imageInput.files);

//     if (!imageInput.files || !imageInput.files[0]) {
//       alert('Please select an image.');
//       return;
//     }

//     const selectedFile = imageInput.files[0];
// console.log("Selected File:", selectedFile);

//     const formData = new FormData();
//     formData.append('photo', selectedFile);

//     // Assuming this.selectedPropertyId is set in your component
//     this._propertiesService.uploadPropertyImage(this.data.propertyId, formData)
//       .subscribe(
//         response => {
//           alert('Image uploaded successfully');
//           this.dialogRef.close();
//         },
//         error => {
//           console.error('Error uploading image:', error);
//           alert('Error uploading image. Please try again.');
//         }
//       );
//   }
