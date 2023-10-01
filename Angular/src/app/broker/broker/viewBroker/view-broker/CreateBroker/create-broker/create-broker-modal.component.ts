import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';


@Component({
  selector: 'app-create-broker-modal',
  templateUrl: './create-broker-modal.component.html',
  styleUrls: ['./create-broker-modal.component.scss'],
})
export class CreateBrokerModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  brokerModel: Broker = new Broker();
  commissionRatePercentage: number | null = null;
  commissionRatePlaceholderText: string = "Commission Rate (%)";

  constructor(
    private dialogRef: MatDialogRef<CreateBrokerModalComponent>,
    private brokerService: BrokerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  AddBroker() {
    if (this.commissionRatePercentage === null) {
      // Handle empty commission rate here
      alert("Commission rate is empty.");
      return;
    }

    debugger;
    this.commissionRatePlaceholderText = "";
    this.brokerModel.commissionRate = this.commissionRatePercentage * 0.01;
    console.log(this.brokerModel.commissionRate)

    this.brokerService.createBroker(this.brokerModel).subscribe(
      (response) => {
        console.log('Broker created successfully:', response);
        // You can optionally close the modal after creating the broker
        this.snackBar.open('Broker created successfully', 'Close', {
          duration: 9000,
        });
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating broker:', error);
      }
    );
  }

  name = new FormControl('', [Validators.required]);

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Name required';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

    surname = new FormControl('', [Validators.required]);

    getErrorMessageSurname() {
      if (this.surname.hasError('required')) {
        return 'Surname required';
      }

      return this.surname.hasError('surname') ? 'Not a valid surname' : '';
    }

    phoneNumber = new FormControl('', [Validators.required]);

    getErrorMessagePhoneNumber() {
      if (this.phoneNumber.hasError('required')) {
        return 'Personal phone number required';
      }

      return this.phoneNumber.hasError('phoneNumber') ? 'Not a valid personal phone number' : '';
    }

    officeAddress = new FormControl('', [Validators.required]);

    getErrorMessageOfficeAddress(){
      if (this.officeAddress.hasError('required')) {
        return 'Office Address required';
      }

      return this.officeAddress.hasError('officeAddress') ? 'Not a valid office address' : '';
    }
    //license number
    licenseNumber = new FormControl('', [Validators.required]);
    getErrorMessageLicenseNumber(){
      if (this.licenseNumber.hasError('required')) {
        return 'License Number required';
      }

      return this.licenseNumber.hasError('licenseNumber') ? 'Not a valid License Number' : '';
    }
    }

