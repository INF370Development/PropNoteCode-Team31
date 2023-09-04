import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Payment } from 'src/app/shared/Payment';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.scss']
})
export class EditPaymentComponent  implements OnInit {
  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d+$/), // Accepts only digits
    Validators.max(999999), // Maximum value is 999,999
  ]);
  adminRole: boolean = false;
  editorRole: boolean = false;
  viewerRole: boolean = false;

  PaymentModal: Payment = {
    maintenanceID: 0,
    amount: 0
  };

  constructor(
    private dialogRef: MatDialogRef<EditPaymentComponent>,
    private maintenanceService: MaintenanceService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  updateAmount(x:any)
  {
    this.PaymentModal.amount=x;
  }
  createRole() {
    this.dialogRef.close();
  }

  closeModal() {
    this.dialogRef.close();
  }

  EditPayment() {
    debugger;
    this.PaymentModal.maintenanceID=this.maintenanceService.MaintenanceId;
    this.maintenanceService.EditPayment(this.maintenanceService.MaintenanceId,this.PaymentModal).subscribe(
      (response) => {
        console.log('Payment edited successfully:', response);
        // You can optionally close the modal after creating the snaglistitem
        this.dialogRef.close();
        location.reload();
      },
      (error) => {
        console.error('Error editing Payment:', error);
      }
    );
  }
}


