import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaseService } from 'src/app/services/lease.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { Property } from 'src/app/shared/Property/Property';
import { PropertiesService } from 'src/app/services/properties.service';
import { TenantService } from 'src/app/services/tenant.service';
import { DepositRequest } from 'src/app/shared/Leases/Leases';
import { catchError, throwError } from 'rxjs';

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
  snackBar: any;

  constructor(
    private dialogRef: MatDialogRef<AddLeaseModalComponent>,
    private formBuilder: FormBuilder,
    private leaseService: LeaseService,
    private propertiesService: PropertiesService,
    private tenantService: TenantService,
    private cdRef : ChangeDetectorRef
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
 // Check if any required fields are empty
 const formControls = this.leaseForm.controls;
 const requiredFields = ['startDate', 'endDate', 'tenantID', 'propertyID', 'monthlyAmount'];
 let isFormIncomplete = false;

 requiredFields.forEach(field => {
   if (!formControls[field].value) {
     formControls[field].setErrors({ 'required': true });
     isFormIncomplete = true;
   }
 });

 if (isFormIncomplete) {
   // Display a snackbar message indicating the form is incomplete
   this.snackBar.open('Please fill in all required fields.', '', {
     duration: 3000, // 3 seconds
     panelClass: ['mat-toolbar', 'mat-primary'] // Optional styling classes
   });
   return;
 }

    if (this.leaseForm.valid) {
      const leaseRequest = {
        startDate: this.leaseForm.value.startDate,
        endDate: this.leaseForm.value.endDate,
        tenantID: this.leaseForm.value.tenantID,
        propertyID: this.leaseForm.value.propertyID,
        monthlyAmount: this.leaseForm.value.monthlyAmount,
      };

      const depositRequest = {
        leaseID: 0, // Placeholder for leaseID (will be set after adding the lease)
        amount: this.leaseForm.value.depositAmount,
      };

      console.log('Lease Request:', leaseRequest);
      console.log('Deposit Request:', depositRequest);

      console.log('Before addLease Observable');
      this.leaseService.addLease(leaseRequest)
        .pipe(
          catchError((error) => {
            console.error('Error adding lease:', error);
            // Handle the error as needed, e.g., show an error message.
            return throwError(error);
          })
        )
        .subscribe((addedLease) => {
          console.log('Lease Added:', addedLease);

          if (this.showDepositInput) {
            const depositRequest = {
              leaseID: addedLease.leaseID,
              amount: this.leaseForm.value.depositAmount,
          }

          console.log('Before addDeposit Observable');
          this.leaseService.addDeposit(addedLease.leaseID, depositRequest)
            .pipe(
              catchError((error) => {
                console.error('Error adding deposit:', error);
                // Handle the error as needed.
                return throwError(error);
              })
            )
            .subscribe((deposit) => {
              console.log('Deposit Added:', deposit);
              // You can handle further actions or close the modal here
              this.dialogRef.close();
              location.reload();

            });} else {
              // If "Add Deposit" button is not clicked, just close the modal
              this.dialogRef.close();
              location.reload();
            }
          });
      }
    }



  addDeposit() {
    console.log("function called");
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

    if (this.showDepositInput) {
      this.leaseForm.addControl('depositAmount', new FormControl(null, Validators.required));
    } else {
      this.leaseForm.removeControl('depositAmount');
    }

    // Manually trigger change detection
    this.cdRef.detectChanges();
  }
}
