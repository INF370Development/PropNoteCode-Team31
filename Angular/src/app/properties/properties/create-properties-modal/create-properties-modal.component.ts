import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Broker } from 'src/app/shared/Broker';
import { Property } from 'src/app/shared/Property/Property';

@Component({
  selector: 'app-create-broker-modal',
  templateUrl: './create-properties-modal.component.html',
  styleUrls: ['./create-properties-modal.component.scss'],
})
export class CreatePropertiesModalComponent implements OnInit {
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  propertyModel: Property = {
    propertyID: 0,
    description: '',
    buildingNumber: 0,
    street: '',
    suburb: '',
    purchaseAmount: 0,
    purchaseYear: 2023,
    size:0,
    yard:0,
    brokerID: 0,
    broker: new Broker(),
  };
brokers: Broker[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreatePropertiesModalComponent>,
    private propertyService: PropertiesService,
    private router: Router,
    private brokerService: BrokerService
  ) {}

  ngOnInit(): void {
    this.brokerService.getBrokers().subscribe((brokers) => {
      this.brokers = brokers;
  });
}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  CreateProperty() {
    this.propertyService.CreateProperty(this.propertyModel).subscribe(
      (response) => {
        console.log('Property created successfully:', response);
        // You can optionally close the modal after creating the broker
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating property:', error);
      }
    );
  }

  updateSelectedBroker(broker: Broker) {
    this.propertyModel.broker = broker;
    this.propertyModel.brokerID = broker.brokerID;
  }

  // Send the selected brokerID to the backend
  sendToBackend() {
  //  debugger;
    if (this.propertyModel.broker) {
      const brokerID = this.propertyModel.broker.brokerID;
      console.log("BrokerID", brokerID)
    }

  }


  //Description
  description = new FormControl('', [Validators.required]);

  getErrorMessageDescription() {
    if (this.description.hasError('required')) {
      return 'Description required';
    }

    return this.description.hasError('description') ? 'Not a valid description' : '';
  }
  //Building Number
  buildingNumber = new FormControl('', [Validators.required]);

  getErrorMessageBuildingNumber() {
    if (this.buildingNumber.hasError('required')) {
      return 'Building number required';
    }

    return this.buildingNumber.hasError('buildingNumber') ? 'Not a valid building number' : '';
  }
  //Street
  street = new FormControl('', [Validators.required]);

  getErrorMessageStreet() {
    if (this.street.hasError('required')) {
      return 'Street required';
    }

    return this.street.hasError('street') ? 'Not a valid street' : '';
  }
  //Suburb
  suburb = new FormControl('', [Validators.required]);

  getErrorMessageSuburb() {
    if (this.suburb.hasError('required')) {
      return 'Suburb required';
    }

    return this.suburb.hasError('suburb') ? 'Not a valid suburb' : '';
  }
  //Purchase Amount
  /*purchaseAmount = new FormControl('', [Validators.required]);

  getErrorMessagePurchaseAmount() {
    if (this.purchaseAmount.hasError('required')) {
      return 'Purchase amount required';
    }

    return this.purchaseAmount.hasError('purchaseAmount') ? 'Not a valid purchase amount' : '';
  }
  //Purchase Year
  purchaseYear = new FormControl('', [Validators.required]);

  getErrorMessagePurchaseYear() {
    if (this.purchaseYear.hasError('required')) {
      return 'Purchase year required';
    }

    return this.purchaseYear.hasError('purchaseYear') ? 'Not a valid purchase year' : '';
  }
  //Size
  size = new FormControl('', [Validators.required]);

  getErrorMessageSize() {
    if (this.size.hasError('required')) {
      return 'Size required';
    }

    return this.size.hasError('size') ? 'Not a valid size' : '';
  }
  //Yard
  yard = new FormControl('', [Validators.required]);

  getErrorMessageYard() {
    if (this.yard.hasError('required')) {
      return 'Yard required';
    }

    return this.yard.hasError('yard') ? 'Not a valid yard' : '';
  }*/

}
