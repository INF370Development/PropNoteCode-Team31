import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/services/tenant.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { DeleteTenantDialogComponent } from '../../deleteTenantDialog/delete-tenant-dialog.component';
import { UpdateTenantModalComponent } from '../../updateTenantModal/update-tenant-modal.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Property } from 'src/app/shared/Property/Property';
import { Deposit, Lease } from 'src/app/shared/Leases/Leases';
import { PropertiesService } from 'src/app/services/properties.service'; // Import PropertiesService
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tenant-details',
  templateUrl: './tenant-details.component.html',
  styleUrls: ['./tenant-details.component.scss'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})

export class TenantDetailsComponent implements OnInit {
  tenantDetail: Tenant = new Tenant();
  selectedLease: Lease | null = null; // Store the selected lease
  properties: Property[] = []; // Store properties
  @Output() documentUploaded = new EventEmitter<void>();
  selectedFile: File | null = null;
  fileName: string | null = null;


  constructor(
    private _tenantService: TenantService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private _propertiesService: PropertiesService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { tenantID: number },
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

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.fileName = this.selectedFile ? this.selectedFile.name : null;

    // Read the selected file and convert it to a data URL
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.fileSrc = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Replace 'upload-url' with the actual server-side endpoint for file uploads
      this.http.post('upload-url', formData).subscribe((response: any) => {
        if (response && response.fileUrl) {
          // Set the file URL as the source for the iframe
          this.selectedFile = response.fileUrl;
        }
      });
    }
  }
}
