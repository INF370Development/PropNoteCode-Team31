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
    inspections: []
  };
brokers: Broker[] = [];
recoveries: Recovery[] =[];

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

}
