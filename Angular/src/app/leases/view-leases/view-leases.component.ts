import { Component, OnInit } from '@angular/core';
import { LeaseService } from 'src/app/services/lease.service';
import { Lease } from 'src/app/shared/Leases/Leases';

@Component({
  selector: 'app-view-leases',
  templateUrl: './view-leases.component.html',
  styleUrls: ['./view-leases.component.scss']
})
export class ViewLeasesComponent implements OnInit {
  displayedColumns: string[] = ['startDate', 'endDate', 'monthlyAmount', 'tenant', 'company', 'property']; // Update column names
  leases: Lease[] = [];

  constructor(private leaseService: LeaseService) {}

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
}
