import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaseService } from 'src/app/services/lease.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { Property } from 'src/app/shared/Property/Property';
import { PropertiesService } from 'src/app/services/properties.service';
import { TenantService } from 'src/app/services/tenant.service';
import { DepositRequest, Lease, LeaseRequest } from 'src/app/shared/Leases/Leases';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  futureDatesFilter = (date: Date | null): boolean => {
    if (date === null) {
      return false; // Handle the null case, e.g., disallow it
    }

    const today = new Date();
    return date >= today;
  };

  leases: Lease[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddLeaseModalComponent>,
    private formBuilder: FormBuilder,
    private leaseService: LeaseService,
    private propertiesService: PropertiesService,
    private tenantService: TenantService,
    private cdRef : ChangeDetectorRef,
    private snackBar: MatSnackBar
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

    // Fetch the list of tenants, properties, and leases during component initialization
    this.fetchTenants();
    this.fetchProperties();
    this.fetchLeases();
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

  fetchLeases() {
    this.leaseService.getAllLeases().subscribe((leases) => {
      this.leases = leases;
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
        panelClass: ['mat-toolbar', 'mat-primary'], // Optional styling classes
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

      if (this.isOverlappingLease(leaseRequest)) {
        this.snackBar.open('There is an overlapping lease on the same property.', '', {
          duration: 3000,
          panelClass: ['mat-toolbar', 'mat-warn'],
        });
        return;
      }

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
            if (error.status === 409) {
              this.snackBar.open('Overlapping leases are not allowed.', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            } else {
              console.error('Error adding lease:', error);
              this.snackBar.open('Failed to add lease.', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-error'],
              });
            }
            return throwError(error);
          })
        )
        .subscribe((addedLease) => {
          console.log('Lease Added:', addedLease);

          if (this.showDepositInput) {
            const depositRequest = {
              leaseID: addedLease.leaseID,
              amount: this.leaseForm.value.depositAmount,
            };

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
              });
          } else {
            // If "Add Deposit" button is not clicked, just close the modal
            this.dialogRef.close();
            location.reload();
          }
        });
    }
  }

  isOverlappingLease(newLease: LeaseRequest): boolean {
    for (const existingLease of this.leases) {
      console.log('existingLease.propertyID:', existingLease.propertyID);
      console.log('newLease.propertyID:', newLease.propertyID);

      debugger;

      if (
        existingLease.propertyID === newLease.propertyID &&
        newLease.startDate < existingLease.endDate &&
        newLease.endDate > existingLease.startDate
      ) {
        return true; // There is an overlap
      }
    }
    return false; // No overlap
  }

  addDeposit() {
    console.log('Function called');
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
