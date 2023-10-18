import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContractorService } from 'src/app/services/contractor.service';
import { DeleteBrokerModelComponent } from '../delete-broker-model/delete-broker-model.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router} from '@angular/router';
import { Broker } from 'src/app/shared/Broker';
import { BrokerService } from 'src/app/services/broker.service';
import { UpdateBrokerComponent } from '../updateBroker/update-broker/update-broker.component';

const baseFileUrl = 'https://localhost:7251';

@Component({
  selector: 'app-viewBrokerDetails',
  templateUrl: './viewBrokerDetailsComponent.html',
  styleUrls: ['./viewBrokerDetailsComponent.scss'],
})
export class ViewBrokerDetailsComponent implements OnInit {
  brokerDetail: Broker = new Broker();
  @Output() documentUploaded = new EventEmitter<void>();
  selectedFile: File | null = null;
  fileName: string | null = null;
  fileUrl: string | null = null;
  brokerDocuments: any[] = [];
  customDocumentName: string | null = null;

  constructor(
    private _brokerService: BrokerService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { contractorID: number },
  ) {}

  ngOnInit(): void {
    this.loadBroker();
    this.loadBrokerDocuments();
  }

  onClickBroker() {
    this.router.navigate(['/viewBrokers']);
  }

  setCustomDocumentName(name: string) {
    this.customDocumentName = name;
  }

  loadBroker() {
    const brokerID = this.route.snapshot.params['id'];
    this._brokerService.getBrokerByID(brokerID).subscribe((result: Broker) => {
      this.brokerDetail = result;
    });
  }

  openUpdateModal() {
    const dialogRef = this.dialog.open(UpdateBrokerComponent, {
      data: this.brokerDetail, // Pass the entire tenantDetail object
    });

    dialogRef.afterClosed().subscribe((updatedUser: any) => {
      if (updatedUser) {
        // Update the user data
        this.brokerDetail = updatedUser;
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteBrokerModelComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result === 'delete') {
        // Handle tenant deletion here
        this.deleteBroker();
      }
    });
  }

  deleteBroker() {
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
        `https://localhost:7251/api/Tenant/UploadTenantDocument/${this.brokerDetail.brokerID}`,
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

  loadBrokerDocuments() {
    const brokerID = this.route.snapshot.params['id'];
    this._brokerService.getBrokerDocuments(brokerID).subscribe((documents: any[]) => {
      this.brokerDocuments = documents;
      console.log("Documents", documents)
    });
  }

  deleteDocument(documentID: number) {
    this._brokerService.deleteBrokerDocument(documentID).subscribe(
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

/*import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Broker } from 'src/app/shared/Broker';
import { BrokerService } from 'src/app/services/broker.service';

NgModule({
  imports: [
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIcon,
  ],
});

@Component({
  selector: 'app-viewBrokerDetails',
  templateUrl: './viewBrokerDetailsComponent.html',
  styleUrls: ['./viewBrokerDetailsComponent.scss'],
})
export class ViewBrokerDetailsComponent implements AfterViewInit {
  brokerDetail : Broker = new Broker();


  constructor(public dialog: MatDialog, private _brokerService: BrokerService, private route:ActivatedRoute) {
    console.log("broker details", Broker)
  }

  ngAfterViewInit(): void {
this.loadBroker();
}

loadBroker()
{
  this._brokerService.getBroker(this.route.snapshot.params['id']).subscribe((result) =>
  {
    this.brokerDetail = result
    console.log("Broker Result", result)
  });

}
}*/
