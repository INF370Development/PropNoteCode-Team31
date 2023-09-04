import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaseService } from 'src/app/services/lease.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { Property } from 'src/app/shared/Property/Property';
import { PropertiesService } from 'src/app/services/properties.service';
import { TenantService } from 'src/app/services/tenant.service';
import { DepositRequest } from 'src/app/shared/Leases/Leases';

@Component({
  selector: 'app-add-lease-modal',
  templateUrl: './add-lease-modal.component.html',
  styleUrls: ['./add-lease-modal.component.scss'],
})
export class AddLeaseModalComponent implements OnInit {
  leaseForm: FormGroup;
  tenants: Tenant[] = [];
  properties: Property[] = [];
  showDepositInput: boolean = false;
  depositRequest: DepositRequest = new DepositRequest();

  constructor(
    private dialogRef: MatDialogRef<AddLeaseModalComponent>,
    private formBuilder: FormBuilder,
    private leaseService: LeaseService,
    private propertiesService: PropertiesService,
    private tenantService: TenantService
  ) {
    this.leaseForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.leaseForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      tenantID: ['', Validators.required],
      propertyID: ['', Validators.required],
      monthlyAmount: ['', Validators.required],
    });

    // Fetch the list of tenants and properties during component initialization
    this.fetchTenants();
    this.fetchProperties();
  }

  fetchTenants() {
    this.tenantService.getTenants().subscribe((tenants) => {
      this.tenants = tenants;
    });
  }

  fetchProperties() {
    this.propertiesService.getProperties().subscribe((properties) => {
      this.properties = properties;
    });
  }

  onSubmit() {
    debugger;
    if (this.leaseForm.valid) {
      const leaseRequest = {
        startDate: this.leaseForm.value.startDate,
        endDate: this.leaseForm.value.endDate,
        tenantID: this.leaseForm.value.tenantID,
        propertyID: this.leaseForm.value.propertyID,
        monthlyAmount: this.leaseForm.value.monthlyAmount,
      };

      this.leaseService.addLease(leaseRequest).subscribe((addedLease) => {
        // Now that the lease is added, you can proceed to add the deposit
        if (this.depositRequest.amount) {
          const depositRequest = {
            leaseID: addedLease.leaseID,
            amount: this.depositRequest.amount,
          };

          // Send the deposit request to the service
          this.leaseService.addDeposit(addedLease.leaseID, depositRequest).subscribe((deposit) => {
            console.log('Deposit Added:', deposit);
            // You can handle further actions or close the modal here
          });
        }
      });
    }
  }
  addDeposit() {
    const depositAmount = this.leaseForm?.get('depositAmount')?.value;

    if (depositAmount) {
      // You can send the deposit request to the service or handle it as needed
      console.log('Deposit Amount:', depositAmount);

      // Hide the deposit input after adding the deposit
      this.showDepositInput = false;
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  toggleDepositInput() {
    this.showDepositInput = !this.showDepositInput;

    // Dynamically add or remove the depositAmount control based on showDepositInput
    if (this.showDepositInput) {
      this.leaseForm.addControl('depositAmount', new FormControl(null, Validators.required));
    } else {
      this.leaseForm.removeControl('depositAmount');
    }
  }
}
