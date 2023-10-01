import { Component,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BrokerService } from 'src/app/services/broker.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})

@Component({
  selector: 'app-delete-broker-model',
  templateUrl: './delete-broker-model.component.html',
  styleUrls: ['./delete-broker-model.component.scss']
})
export class DeleteBrokerModelComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteBrokerModelComponent>) { }

  closeModal() {
    this.dialogRef.close();
  }

}
