import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
  snackBar: any;

  constructor(
    private dialogRef: MatDialogRef<CreateBrokerModalComponent>,
    private brokerService: BrokerService,
    private router: Router
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
    //debugger;
    this.brokerModel.commissionRate = this.commissionRatePercentage/100;
    this.commissionRatePlaceholderText = "";
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

  //Name
  name = new FormControl('', [Validators.required]);

  getErrorMessageName() {
    if (this.name.hasError('required')) {
      return 'Name required';
    }

    return this.name.hasError('name') ? 'Not a valid name' : '';
  }

    //Surname
    surname = new FormControl('', [Validators.required]);

    getErrorMessageSurname() {
      if (this.surname.hasError('required')) {
        return 'Surname required';
      }
  
      return this.surname.hasError('surname') ? 'Not a valid surname' : '';
    }
    //Phone Number
    phoneNumber = new FormControl('', [Validators.required]);
  
    getErrorMessagePhoneNumber() {
      if (this.phoneNumber.hasError('required')) {
        return 'Personal phone number required';
      }
  
      return this.phoneNumber.hasError('phoneNumber') ? 'Not a valid personal phone number' : '';
    }

    //office address
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

    // //commision rate 
    // commissionRatePercentage = new FormControl('', [Validators.required]);

    // getErrorMessageCommissionRatePercentage() {
    //   if (this.commissionRatePercentage.hasError('required')) {
    //     return 'License Number required';
    //   }
  
    //   return this.commissionRatePercentage.hasError('commissionRatePercentage') ? 'Not a valid License Number' : '';
    // }
    }

