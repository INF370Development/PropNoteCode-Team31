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
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseFileUrl = 'https://localhost:7251';

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
  fileUrl: string | null = null;
  tenantDocuments: any[] = [];



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
    this.loadTenantDocuments();
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
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      // Replace 'upload-url' with the actual server-side endpoint for file uploads
      this.http.post(
        `https://localhost:7251/api/Tenant/UploadTenantDocument/${this.tenantDetail.tenantID}`,
        formData,
        { responseType: 'text' } // Specify response type as plain text
      ).subscribe(
        (response: string) => {
          // Handle the plain text response (e.g., display a success message)
          console.log("Response:", response);
          // You can display the response message to the user if needed
          // this.fileUrl = response;
          // Emit an event or update your UI as needed
          this.documentUploaded.emit();
          location.reload();
        },
      (error: HttpErrorResponse) => {
        if (error.status === 400) {
          // Handle bad request error (e.g., no file uploaded)
          console.error("Bad Request:", error.error);
        } else if (error.status === 404) {
          // Handle not found error (e.g., tenant not found)
          console.error("Not Found:", error.error);
        } else {
          // Handle other errors
          console.error("Server Error:", error.error);
        }

      });
    }
  }

  loadTenantDocuments() {
    const tenantID = this.route.snapshot.params['id'];
    this._tenantService.getTenantDocuments(tenantID).subscribe((documents: any[]) => {
      this.tenantDocuments = documents;
      console.log("Documents", documents)
    });
  }

  deleteDocument(documentID: number) {
    this._tenantService.deleteTenantDocument(documentID).subscribe(
      () => {
        // Successful deletion logic here
        console.log('Document deleted successfully');
        location.reload();
        // Optionally, you can refresh the tenantDocuments list here.
      },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 200) {
            // Handle the successful text response
            if (error.error === 'Document deleted successfully') {
              // Successful deletion logic here
              console.log('Document deleted successfully');
              // Optionally, you can refresh the tenantDocuments list here.
            } else {
              // Handle unexpected text response here.
              console.error('Unexpected server response:', error.error);
            }
          } else {
            console.error('Error deleting document:', error);
            // Handle other errors (e.g., network issues) here.
          }
        }
      }
    );
  }


}
