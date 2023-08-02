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

  brokerModel: Broker = {
    Name: '',
    Surname: '',
    PhoneNumber: '',
    OfficeAddress: '',
    LicenseNumber: '',
    CommissionRate: '',
  };

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
    debugger;
    this.brokerService.createBroker(this.brokerModel).subscribe(
      (response) => {
        console.log('Broker created successfully:', response);
        // You can optionally close the modal after creating the broker
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error creating broker:', error);
      }
    );
  }
}
