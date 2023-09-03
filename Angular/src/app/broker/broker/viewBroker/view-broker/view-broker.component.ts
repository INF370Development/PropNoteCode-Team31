import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    'detailsButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Broker>();


  refreshTableData() {
    this._brokerService.getBrokers().subscribe((broker: any) => {
      this.dataSource.data = broker;
    });
  }


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


  openDeleteConfirmationDialog(brokerID: number) {
    const dialogRef = this.dialog.open(DeleteBrokerModelComponent, {
      data: { brokerID }, 
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteBroker(brokerID);
      }
    });
  }


  deleteBroker(brokerID: any) {
    this._brokerService.deleteBroker(brokerID).subscribe(
      ()=>{
        this.snackBar.open('Broker deleted successfully', 'Close', {
          duration: 2000,
        });
        this.refreshTableData();
      },
      (error) => {
        console.error('Error deleting Broker:', error);
        this.snackBar.open('Error deleting Broker', 'Close', {
          duration: 2000,
        });
      }
    );
   
  }

  // showSnackBar() {
  //   const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
  //     'Deleted successfully',
  //     'X',
  //     { duration: 500 }
  //   );
  //   snackBarRef.afterDismissed().subscribe(() => {
  //     location.reload();
  //   });
  // }

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
