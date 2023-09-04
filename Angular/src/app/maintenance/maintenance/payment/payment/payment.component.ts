import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { RecordPaymentComponent } from '../record-payment/record-payment.component';
import { MatDialog } from '@angular/material/dialog';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { Payment } from 'src/app/shared/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'maintenanceID',
    'amount',
    'detailsButton',
    'deleteButton',
  ];
  dataSource = new MatTableDataSource<Payment>();

  constructor(
    private _maintenanceService: MaintenanceService,
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
    this._maintenanceService.getPayments().subscribe((Payments: any) => {
      this.dataSource.data = Payments;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteSnaglistitem(id: any) {
    await this._maintenanceService.deletePayment(id).subscribe();
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
    this.dialog.open(RecordPaymentComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  EditPayment(x: any) {
    this._maintenanceService.MaintenanceId = x;
    const dialogRef = this.dialog.open(EditPaymentComponent, {});
  }
  openModal() {
    const dialogRef = this.dialog.open(RecordPaymentComponent, {});
  }
}
