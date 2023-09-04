import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-lease-dialog',
  templateUrl: './delete-lease-dialog.component.html',
  styleUrls: ['./delete-lease-dialog.component.scss']
})
export class DeleteLeaseDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteLeaseDialogComponent>) {}

  closeModal() {
    this.dialogRef.close({ confirm: false });
  }
}
