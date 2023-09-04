import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable, catchError, map } from 'rxjs';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { PropertiesService } from 'src/app/services/properties.service';
  import { Maintenance } from 'src/app/shared/Maintenace';
  import { Property } from 'src/app/shared/Property/Property';
  import { MaintenanceType } from 'src/app/shared/MaintenanceType';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  import { MaintenanceNote } from 'src/app/shared/MaintenanceNote';
  import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
  import { EditMaintenanceComponent } from './edit-maintenance/edit-maintenance.component';
  import { EditMaintenanceNoteComponent } from '../maintenanceNote/edit-maintenance-note/edit-maintenance-note.component';
  import { AddMaintenanceNoteComponent } from '../maintenanceNote/add-maintenance-note/add-maintenance-note.component';
  import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { EditPaymentComponent } from '../payment/edit-payment/edit-payment.component';
import { RecordPaymentComponent } from '../payment/record-payment/record-payment.component';
  
  @Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss']
  })
  export class ViewMaintenanceComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [
      'propertyID',
      'contractors',
      'maintenanceStatusID',
      'maintenanceTypeID',
      'note',
      'payment',
      'maintenanceDate',
      'maintenanceTime',
      'editButton',
    ];
    dataSource = new MatTableDataSource<Maintenance>();
    dataSourcex:any;
    maintenance_status: string[] = []; 
    maintenance_type: string[] = []; 
    maintenance_note: string[] = []; 
    _payment:string[] = []; 
    date:string[] = []; 
    time:string[] = []; 
    status: any;
    type:any;
    note:any;
    payment: any;
    property:any;
    constructor(
      private _propertyService:PropertiesService,
      private _maintenanceService: MaintenanceService,
      private snackBar: MatSnackBar,
      public dialog: MatDialog,
      private _httpClient: HttpClient
    ) {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    ngOnInit(): void {
      this._maintenanceService.getMaintenances().subscribe((Maintenance: any) => {
        this.dataSource.data = Maintenance;
        this.dataSourcex=Maintenance;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  

    async deleteMaintenance(id: any) {
      await this._maintenanceService.deleteMaintenance(id).subscribe();
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
      this.dialog.open(AddMaintenanceComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  
    openModal() {
      const dialogRef = this.dialog.open(AddMaintenanceComponent, {});
    }

    openEditDialog(
      enterAnimationDuration: string,
      exitAnimationDuration: string
    ): void {
      this.dialog.open(EditMaintenanceComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  
    openEditModal(x:any) {
      this._maintenanceService.MaintenanceId=x;
      const dialogRef = this.dialog.open(EditMaintenanceComponent, {});
    }
    AddNote(x:any)
    {
      this._maintenanceService.MaintenanceId=x;
      const dialogRef = this.dialog.open(AddMaintenanceNoteComponent, {});
    }
    EditNote(x:any)
    {
      this._maintenanceService.MaintenanceId=x;
      const dialogRef = this.dialog.open(EditMaintenanceNoteComponent, {});
    }
    EditPayment(x:any)
    {
      this._maintenanceService.MaintenanceId=x;
      const dialogRef = this.dialog.open(EditPaymentComponent, {});
    }
    AddPayment(x:any)
    {
      this._maintenanceService.MaintenanceId=x;
      const dialogRef = this.dialog.open(RecordPaymentComponent, {});
    }
    xx()
    {
      for(let i=0;i<6;i++)
      {  this.maintenance_status.push("ss");}
    }
    
  }
  

