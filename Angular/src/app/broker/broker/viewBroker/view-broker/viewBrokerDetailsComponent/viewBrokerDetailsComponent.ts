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
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
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
  }

  onClickBroker() {
    this.router.navigate(['/viewBroker']);
  }

  setCustomDocumentName(name: string) {
    this.customDocumentName = name;
  }

  loadBroker() {
    const brokerID = this.route.snapshot.params['id'];
    this._brokerService.getBroker(brokerID).subscribe((result: Broker) => {
      this.brokerDetail = result;
    });
  }

  openUpdateModal(broker: Broker) {
    const dialogRef = this.dialog.open(UpdateBrokerComponent, {
      data: {broker}, // Pass the entire tenantDetail object
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Update the user data
        this.loadBroker();
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
