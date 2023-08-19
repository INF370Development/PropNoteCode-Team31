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
    'detailsButton',
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
    this._brokerService.getBrokers().subscribe((brokers: any) => {
      this.dataSource.data = brokers;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteBroker(id: any) {
    await this._brokerService.deleteBroker(id);
    this.showSnackBar();
  }

  showSnackBar() {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(
      'Deleted successfully',
      'X',
      { duration: 500 }
    );
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
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
