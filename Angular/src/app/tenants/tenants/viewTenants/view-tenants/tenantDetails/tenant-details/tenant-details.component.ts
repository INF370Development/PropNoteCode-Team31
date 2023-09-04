import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/services/tenant.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { DeleteTenantDialogComponent } from '../../deleteTenantDialog/delete-tenant-dialog.component';
import { UpdateTenantModalComponent } from '../../updateTenantModal/update-tenant-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Property } from 'src/app/shared/Property/Property';
import { Deposit, Lease } from 'src/app/shared/Leases/Leases';
import { PropertiesService } from 'src/app/services/properties.service'; // Import PropertiesService

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss']
})

export class TenantDetailsComponent implements OnInit {
  tenantDetail: Tenant = new Tenant();
  selectedLease: Lease | null = null; // Store the selected lease
  properties: Property[] = []; // Store properties

  constructor(
    private _tenantService: TenantService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    this.loadTenant();
    this.loadProperties();
  }

  loadTenant() {
    const tenantID = this.route.snapshot.params['id'];
    this._tenantService.getTenantByID(tenantID).subscribe((result: Tenant) => {
      this.tenantDetail = result;
    });
  }
  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateTenantModalComponent, {
      data: this.tenantDetail, // Pass the entire tenantDetail object
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        // Update the user data
        this.tenantDetail = updatedUser;
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteTenantDialogComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        // Handle tenant deletion here
        this.deleteTenant();
      }
    });
  }

  selectLease(lease: Lease) {
    this.selectedLease = lease;
  }

  // Method to clear the selected lease
  clearSelectedLease() {
    this.selectedLease = null;
  }

  loadProperties() {
    // Fetch properties data and populate the 'properties' array
    this._propertiesService.getProperties().subscribe((result: Property[]) => {
      this.properties = result;
    });
  }

  // Method to get property description by propertyID
  getPropertyDescription(propertyID: number): string | undefined {
    const property = this.properties.find((property) => property.propertyID === propertyID);
    return property?.description;
  }

  deleteTenant() {
    // Implement tenant deletion logic here
  }
}
