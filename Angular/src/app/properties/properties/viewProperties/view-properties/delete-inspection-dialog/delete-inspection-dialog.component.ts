import { MatDialogRef } from '@angular/material/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-inspection-dialog',
  templateUrl: './delete-inspection-dialog.component.html',
  styleUrls: ['./delete-inspection-dialog.component.scss']
})
export class DeleteInspectionDialogComponent {
  constructor(private dialogRef: MatDialogRef<DeleteInspectionDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
