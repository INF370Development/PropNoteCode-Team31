import { Component,Inject,inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

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
    public dialogRef: MatDialogRef<DeleteBrokerModelComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _brokerService: BrokerService,
    private snackBar: MatSnackBar,
    
  ) { }

  deleteBroker(brokerID: any) {
    this._brokerService.deleteBroker(brokerID).subscribe(
      ()=>{
        this.snackBar.open('Broker deleted successfully', 'Close', {
          duration: 2000,
        });
        this.refreshTableData();
      },
      (error: any) => {
        console.error('Error deleting Broker:', error);
        this.snackBar.open('Error deleting Broker', 'Close', {
          duration: 2000,
        });
      }
    );
   
  }
  refreshTableData() {
    throw new Error('Method not implemented.');
  }

  closeModal() {
    this.dialogRef.close();
  }

}
