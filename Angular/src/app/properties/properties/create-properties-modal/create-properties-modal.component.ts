import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BrokerService } from 'src/app/services/broker.service';
import { PropertiesService } from 'src/app/services/properties.service';
import { Broker } from 'src/app/shared/Broker';
import { Inspection } from 'src/app/shared/Property/Inspection';
import { Property } from 'src/app/shared/Property/Property';
import { Recovery } from 'src/app/shared/Property/Recovery';

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
    recoveries: [],
    inspections: [],
    propertyImage: []
  };
brokers: Broker[] = [];
recoveries: Recovery[] =[];
  snackBar: any;

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
validateInputs(): boolean {
  // Description
  if (this.propertyModel.description.length > 100) {
    console.error('Description is too long');
    return false;
  }

  // Building Number
  if (isNaN(this.propertyModel.buildingNumber)) {
    console.error('Invalid building number');
    return false;
  }

  // Street
  if (this.propertyModel.street.trim() === '' || this.propertyModel.street.length > 100) {
    console.error('Invalid street');
    return false;
  }

  // Suburb
  if (this.propertyModel.suburb.trim() === '' || this.propertyModel.suburb.length > 100) {
    console.error('Invalid suburb');
    return false;
  }

  // Purchase Amount
  if (isNaN(this.propertyModel.purchaseAmount) || this.propertyModel.purchaseAmount <= 0) {
    console.error('Invalid purchase amount');
    return false;
  }

  // Size
  if (isNaN(this.propertyModel.size) || this.propertyModel.size <= 0) {
    console.error('Invalid size');
    return false;
  }

  // Yard
  if (isNaN(this.propertyModel.yard) || this.propertyModel.yard <= 0) {
    console.error('Invalid yard');
    return false;
  }

  // Purchase Year
  if (isNaN(this.propertyModel.purchaseYear) || this.propertyModel.purchaseYear > 4) {
    console.error('Invalid purchase year');
    return false;
  }

  // Broker
  if (!this.propertyModel.broker || isNaN(this.propertyModel.broker.brokerID)) {
    console.error('Invalid broker');
    return false;
  }

  return true;
}

  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }
  CreateProperty() {
    const validationErrors = [];

  if (this.propertyModel.description.length > 100) {
    validationErrors.push('Description is too long');
  }

  // Building Number
  if (isNaN(this.propertyModel.buildingNumber)) {
    validationErrors.push('Invalid building number');
  }

  // Street
  if (this.propertyModel.street.trim() === '' || this.propertyModel.street.length > 100) {
    validationErrors.push('Invalid street');
  }

  // Suburb
  if (this.propertyModel.suburb.trim() === '' || this.propertyModel.suburb.length > 100) {
    validationErrors.push('Invalid suburb');
  }

  // Purchase Amount
  if (isNaN(this.propertyModel.purchaseAmount) || this.propertyModel.purchaseAmount <= 0) {
    validationErrors.push('Invalid purchase amount');
  }

  // Size
  if (isNaN(this.propertyModel.size) || this.propertyModel.size <= 0) {
    validationErrors.push('Invalid size');
  }

  // Yard
  if (isNaN(this.propertyModel.yard) || this.propertyModel.yard <= 0) {
    validationErrors.push('Invalid yard');
  }

  // Purchase Year
  if (isNaN(this.propertyModel.purchaseYear) || this.propertyModel.purchaseYear > 10000) {
    validationErrors.push('Invalid purchase year');
  }

  // Broker
  if (!this.propertyModel.broker || isNaN(this.propertyModel.broker.brokerID)) {
    validationErrors.push('Invalid broker');
  }

  if (validationErrors.length > 0) {
    const errorMessage = validationErrors.join('\n');
    alert('Validation errors:\n' + errorMessage);
    return;
  }

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
    // this.snackBar.open('Property created successfully', 'Close', {
    //   duration: 9000,
    // });
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


}
