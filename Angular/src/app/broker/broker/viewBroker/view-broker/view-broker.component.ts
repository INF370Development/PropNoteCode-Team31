import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BrokerService } from 'src/app/services/broker.service';
import { Broker } from 'src/app/shared/Broker';
import { CreateBrokerModalComponent } from './CreateBroker/create-broker/create-broker-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBrokerModelComponent } from './delete-broker-model/delete-broker-model.component';

@Component({
  selector: 'app-view-broker',
  templateUrl: './view-broker.component.html',
  styleUrls: ['./view-broker.component.scss'],
})

export class ViewBrokerComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [

    'name',
    'surname',
    'phoneNumber',
    'officeAddress',
    'licenseNumber',
    'commissonRate',
    'updateButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Broker>();

  constructor(
    private _brokerService: BrokerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadBrokers();
  }

  loadBrokers() {
    this._brokerService.getBrokers().subscribe((brokers: any) => {
      this.dataSource.data = brokers;
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtering based on multiple columns (name, email, etc.)
    this.dataSource.filterPredicate = (data: Broker, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.name.toLowerCase().includes(lowerCaseFilter) ||
        data.surname.toLowerCase().includes(lowerCaseFilter) ||
        data.phoneNumber.includes(filter) ||
        data.officeAddress.toLowerCase().includes(lowerCaseFilter) ||
        data.licenseNumber.toLowerCase().includes(lowerCaseFilter) ||
        data.commissionRate.toString().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  openDeleteBrokerDialog() {
    const dialogRef = this.dialog.open(DeleteBrokerModelComponent, {});
  }

  deleteBroker(brokerID: number) {
    // Call your API to delete the inspection here, e.g., using your PropertiesService
    this._brokerService.deleteBroker(brokerID).subscribe(
      () => {
        console.log('Inspection deleted successfully');
        this.snackBar.open('Broker Deleted Successfully', 'Close', {
          duration: 3000,

        });
        this.loadBrokers();
      },
      (error) => {
        console.error('Error deleting broker:', error);
        this.snackBar.open('Error deleting broker', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }

  confirmDeleteBroker(broker: Broker) {
    console.log(broker);
    const dialogRef = this.dialog.open(DeleteBrokerModelComponent, {
      data: { broker }, // Pass the inspection data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // User confirmed the deletion, implement the deletion logic here
        this.deleteBroker(broker.brokerID);
      }
    });
  }

  refreshTableData() {
    debugger;
    this._brokerService.getBrokers().subscribe((broker: any) => {
      this.dataSource.data = broker;
    });
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(CreateBrokerModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(CreateBrokerModalComponent, {});
  }
}
