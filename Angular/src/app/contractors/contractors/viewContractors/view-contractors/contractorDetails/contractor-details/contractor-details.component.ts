import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { Contractor } from 'src/app/shared/UserModels/Contractor';
import { DeleteContracorDialogComponent } from '../../deleteContractorDialog/delete-contracor-dialog/delete-contracor-dialog.component';
import { UpdateContractorModalComponent } from '../../updateContractorModal/update-contractor-modal/update-contractor-modal.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const baseFileUrl = 'https://localhost:7251';

@Component({
  selector: 'app-contractor-details',
  templateUrl: './contractor-details.component.html',
  styleUrls: ['./contractor-details.component.scss'],
  providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }]
})

export class ContractorDetailsComponent implements OnInit {
  contractorDetail: Contractor = new Contractor();
  @Output() documentUploaded = new EventEmitter<void>();
  selectedFile: File | null = null;
  fileName: string | null = null;
  fileUrl: string | null = null;
  contractorDocuments: any[] = [];
  customDocumentName: string | null = null;

  constructor(
    private _contractorService: ContractorService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { contractorID: number },
  ) {}

  ngOnInit(): void {
    this.loadContractor();
    this.loadContractorDocuments();
  }

  setCustomDocumentName(name: string) {
    this.customDocumentName = name;
  }

  loadContractor() {
    const contractorID = this.route.snapshot.params['id'];
    this._contractorService.getContractorByID(contractorID).subscribe((result: Contractor) => {
      this.contractorDetail = result;
    });
  }

  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateContractorModalComponent, {
      data: this.contractorDetail, // Pass the entire tenantDetail object
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        // Update the user data
        this.contractorDetail = updatedUser;
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteContracorDialogComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        // Handle tenant deletion here
        this.deleteContractor();
      }
    });
  }

  deleteContractor() {
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
      formData.append('documentName', this.fileName || '');
      // Replace 'upload-url' with the actual server-side endpoint for file uploads
      this.http.post(
        `https://localhost:7251/api/Tenant/UploadTenantDocument/${this.contractorDetail.contractorID}`,
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

  loadContractorDocuments() {
    const tenantID = this.route.snapshot.params['id'];
    this._contractorService.getTenantDocuments(tenantID).subscribe((documents: any[]) => {
      this.contractorDocuments = documents;
      console.log("Documents", documents)
    });
  }

  deleteDocument(documentID: number) {
    this._contractorService.deleteTenantDocument(documentID).subscribe(
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




 /* contractorDetail : Contractor = new Contractor();

  constructor(public dialog: MatDialog, private _contractorService: ContractorService, private route:ActivatedRoute) {
    console.log("Contractor details", Contractor)
  }

  ngAfterViewInit(): void {
    this.loadContractor();
  }

  loadContractor()
  {
    this._contractorService.getContractorU(this.route.snapshot.params['id']).subscribe((result) =>
    {
      this.contractorDetail = result
      console.log("Contractor Result", result)
    });
  }

  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateContractorModalComponent, {
      data: this.contractorDetail, // Pass the entire tenantDetail object
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        // Update the user data
        this.contractorDetail = updatedUser;
      }
    });
  }
}*/