import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { Maintenance } from 'src/app/shared/Maintenace';
  import { MaintenanceType } from 'src/app/shared/MaintenanceType';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  import { MaintenanceNote } from 'src/app/shared/MaintenanceNote';
  import { AddMaintenanceComponent } from './add-maintenance/add-maintenance.component';
  import { EditMaintenanceComponent } from './edit-maintenance/edit-maintenance.component';
  import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
  
  @Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss']
  })
  export class ViewMaintenanceComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [
      'propertyID',
      'employeeID',
      'contractors',
      'maintenanceStatusID',
      'maintenanceTypeID',
      'maintenanceDate',
      'maintenanceTime',
      'editButton',
    ];
    dataSource = new MatTableDataSource<Maintenance>();
    status: any;
    type:any;
    note:any;
    type1:MaintenanceType={maintenaceTypeName:""};
    constructor(
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
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    getType(x:any)
    {
      return this._maintenanceService.getMaintenanceType(x,this.type1);
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
  }
  

