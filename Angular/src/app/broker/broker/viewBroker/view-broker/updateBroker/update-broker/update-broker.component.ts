import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';

@Component({
  selector: 'app-update-broker',
  templateUrl: './update-broker.component.html',
  styleUrls: ['./update-broker.component.scss']
})
export class UpdateBrokerComponent implements OnInit{
  brokerData: Broker = new Broker();// Initialize tenantData as an Input property

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { broker: Broker },
    private dialogRef: MatDialogRef<UpdateBrokerComponent>,
    private brokerService: BrokerService
  ) { }


  ngOnInit(): void {
    this.brokerData = { ...this.data.broker };
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Function to update the tenant
  updateBroker() {
    // Send this.inspectionModal to your API for updating
    this.brokerService
      .updateBroker(this.brokerData)
      .subscribe(
        (response) => {
          // Handle success response
          // For example, you can close the modal and notify the user
          this.dialogRef.close();
          location.reload();
        },
        (error) => {
          // Handle error response
          // You can display an error message or perform other actions
          console.error('Error updating broker:', error);
          // Optionally, you can add error handling logic here
        }
      );
  }
  // Implement the rest of your form validation and error messages as needed
}
