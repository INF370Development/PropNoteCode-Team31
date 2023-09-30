import { Component, OnInit } from '@angular/core';
import { LeaseService } from 'src/app/services/lease.service';
import { Deposit, DepositRequest, Lease } from 'src/app/shared/Leases/Leases';
import { AddLeaseModalComponent } from '../add-lease-modal/add-lease-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteLeaseDialogComponent } from '../delete-lease-dialog/delete-lease-dialog.component';
import { AddDepositDialogComponent } from '../add-deposit-dialog/add-deposit-dialog.component';

@Component({
  selector: 'app-view-leases',
  templateUrl: './view-leases.component.html',
  styleUrls: ['./view-leases.component.scss']
})

export class ViewLeasesComponent implements OnInit {

  displayedColumns: string[] = ['tenant', 'company', 'property', 'startDate', 'endDate', 'monthlyAmount', 'deposit', 'actions']; // Update column names
  leases: Lease[] = [];
  depositAmount: number = 0;

  constructor(private leaseService: LeaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLeases();
  }

  loadLeases() {
    this.leaseService.getAllLeases().subscribe((data) => {
      this.leases = data;
      // Fetch complete Tenant and Property objects for each lease
      this.leases.forEach((lease) => {
        this.leaseService.getTenant(lease.tenantID).subscribe((tenant) => {
          lease.tenant = tenant;
        });

        this.leaseService.getPropertyById(lease.propertyID).subscribe((property) => {
          lease.property = property;
        });

        this.leaseService.getAllDepositsByLease(lease.leaseID).subscribe((deposit) => {
          lease.deposit = deposit;
        });

      });
    });
  }

  openAddDepositDialog(lease: Lease): void {
    const dialogRef = this.dialog.open(AddDepositDialogComponent, {
      width: '300px', // Adjust the width as needed
      data: { leaseId: lease.leaseID }, // Pass the lease ID to the dialog component
    });

    dialogRef.afterClosed().subscribe((depositAmount) => {
      if (depositAmount !== undefined) {
        const depositRequest: DepositRequest = { amount: depositAmount };
        this.leaseService.addDeposit(lease.leaseID, depositRequest)
          .subscribe((result) => {
            // Handle the result as needed
            console.log('Deposit Added:', result);
            location.reload();
          });
      }
    });
  }

  openAddLeaseModal() {
    const dialogRef = this.dialog.open(AddLeaseModalComponent, {
      width: '500px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((newLease) => {
      if (newLease) {
        // Handle the newly added lease, e.g., add it to the list of leases displayed in the parent component.
        window.location.reload()
      }
    });
  }

  openDeleteDialog(lease: Lease) {
    const dialogRef = this.dialog.open(DeleteLeaseDialogComponent, {
      width: '300px', // Adjust the width as needed
      data: lease, // Pass the lease to the dialog component if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== 'false') {
        // Delete the lease here
        this.deleteLease(lease);
      }
    });
    }

  deleteLease(lease: Lease): void {
    // Perform the delete operation using your LeaseService
    this.leaseService.deleteLease(lease.leaseID).subscribe(() => {
      // Handle success or error, and potentially refresh the lease list
      this.loadLeases();
    });
  }

}
