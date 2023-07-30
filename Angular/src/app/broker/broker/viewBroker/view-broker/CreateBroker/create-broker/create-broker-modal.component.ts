import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-broker-modal',
  templateUrl: './create-broker-modal.component.html',
  styleUrls: ['./create-broker-modal.component.scss'],
})
export class CreateBrokerModalComponent {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  constructor(private dialogRef: MatDialogRef<CreateBrokerModalComponent>) {}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
}
