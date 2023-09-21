import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-deposit-dialog',
  templateUrl: './add-deposit-dialog.component.html',
  styleUrls: ['./add-deposit-dialog.component.scss']
})
export class AddDepositDialogComponent {
  depositAmount: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddDepositDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { leaseId: number }
  ) {}

  closeDialog(): void {
    this.dialogRef.close(this.depositAmount); // Pass the depositAmount as the result when closing the dialog
  }
}
