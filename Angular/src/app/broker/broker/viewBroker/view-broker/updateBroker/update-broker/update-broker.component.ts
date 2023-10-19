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
  updateForm: FormGroup = new FormGroup({}); // Initialize updateForm here

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Broker,
    private dialogRef: MatDialogRef<UpdateBrokerComponent>,
    private brokerService: BrokerService
  ) {
    console.log(this.data);
    if (data) {
      this.updateForm = new FormGroup({
        name: new FormControl(data.name || '', [Validators.required]),
        surname: new FormControl(data.surname || '', [Validators.required]),
        phoneNumber: new FormControl(data.phoneNumber || '', [Validators.required]),
        officeAddress: new FormControl(data.officeAddress || '', [Validators.required]),
        licenseNumber: new FormControl(data.licenseNumber || '', [Validators.required]),
        commissionRate: new FormControl(data.commissionRate || '', [Validators.required]),
      });
    } else {
      // If 'data' is not defined or lacks the expected structure, provide default values or handle accordingly.
      // You might want to show an error message or take other appropriate actions.
    }
  }


  ngOnInit(): void {
    this.dialogRef.beforeClosed().subscribe((updatedData: Broker) => {
      console.log("Broker", updatedData);

      if (updatedData) {
        this.brokerData = updatedData; // Update the tenantData
        // Initialize the form with tenantData values
        this.updateForm.patchValue({
          name: this.brokerData.name || '',
          surname: this.brokerData.surname || '',
          phoneNumber: this.brokerData.phoneNumber || '',
          officeAddress: this.brokerData.officeAddress || '',
          lisenceNumber: this.brokerData.licenseNumber || '',
          commisionRate: this.brokerData.commissionRate || ''
        });
      }
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  // Function to update the tenant
  updateBroker() {
    if (this.updateForm.valid) {
      // Get the user from the tenant data
      const user = this.brokerData;

      // Update the user's properties
      user.name = this.updateForm.value.name;
      user.surname = this.updateForm.value.surname;
      user.phoneNumber = this.updateForm.value.phoneNumber;
      user.officeAddress = this.updateForm.value.officeAddress;
      user.licenseNumber = this.updateForm.value.licenseNumber;
      user.commissionRate = this.updateForm.value.commissionRate;

      // Call your tenant service's updateTenantUser method to save the changes
      this.brokerService.updateBroker(this.brokerData.brokerID, this.brokerData).subscribe(
        (response) => {
          console.log('Broker updated successfully:', response);
          this.dialogRef.close(this.brokerData); // Emit the updated tenant data
        },
        (error) => {
          console.error('Error updating broker:', error);
          this.dialogRef.close(); // Close the modal
        }
      );
    }
  }
}