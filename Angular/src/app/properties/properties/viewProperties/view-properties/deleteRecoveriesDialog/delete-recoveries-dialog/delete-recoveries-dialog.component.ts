import { Component, EventEmitter, Output  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-recoveries-dialog',
  templateUrl: './delete-recoveries-dialog.component.html',
  styleUrls: ['./delete-recoveries-dialog.component.scss']
})
export class DeleteRecoveriesDialogComponent {


  constructor(private dialogRef: MatDialogRef<DeleteRecoveriesDialogComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }
}
