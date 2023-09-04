import { Component, OnInit } from '@angular/core';
import { LeaseService } from 'src/app/services/lease.service';
import { Lease } from 'src/app/shared/Leases/Leases';
import { AddLeaseModalComponent } from '../add-lease-modal/add-lease-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteLeaseDialogComponent } from '../delete-lease-dialog/delete-lease-dialog.component';

@Component({
  selector: 'app-view-leases',
  templateUrl: './view-leases.component.html',
  styleUrls: ['./view-leases.component.scss']
})
export class ViewLeasesComponent implements OnInit {
  displayedColumns: string[] = ['tenant', 'company', 'property', 'startDate', 'endDate', 'monthlyAmount', 'actions']; // Update column names
  leases: Lease[] = [];

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

          console.log("Tenant", tenant)
        });

        this.leaseService.getPropertyById(lease.propertyID).subscribe((property) => {
          lease.property = property;

          console.log("Property", property)
        });
        console.log("leases", this.leases);
      });
    });
  }

  openAddLeaseModal() {
    const dialogRef = this.dialog.open(AddLeaseModalComponent, {
      width: '500px', // Adjust the width as needed
    });

    dialogRef.afterClosed().subscribe((newLease) => {
      if (newLease) {
        // Handle the newly added lease, e.g., add it to the list of leases displayed in the parent component.
      }
    });
  }

  openDeleteDialog(lease: Lease) {
    const dialogRef = this.dialog.open(DeleteLeaseDialogComponent, {
      width: '300px', // Adjust the width as needed
      data: lease, // Pass the lease to the dialog component if needed
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
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
