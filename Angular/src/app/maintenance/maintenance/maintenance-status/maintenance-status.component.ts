  import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { MaintenanceStatus } from 'src/app/shared/MaintenanceStatus';
  import { AddMaintenanceStatusComponent } from './add-maintenance-status/add-maintenance-status.component';
  import { MatDialog } from '@angular/material/dialog';
import { EditMaintenanceStatusComponent } from './edit-maintenance-status/edit-maintenance-status.component';
  
  @Component({
    selector: 'app-maintenance-status',
    templateUrl: './maintenance-status.component.html',
    styleUrls: ['./maintenance-status.component.scss']
  })
  export class MaintenanceStatusComponent implements AfterViewInit, OnInit {
    
    displayedColumns: string[] = [
      'maintenanceStatusName',
      'deleteButton',
    ];
    dataSource = new MatTableDataSource<MaintenanceStatus>();
  
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
      this._maintenanceService.getMaintenanceStatuses().subscribe((MaintenanceStatus: any) => {
        this.dataSource.data = MaintenanceStatus;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    async deleteStatus(id: any) {
      await this._maintenanceService.deleteMaintenanceStatus(id).subscribe();
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
      this.dialog.open(AddMaintenanceStatusComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
    EditStatus(x:any)
    {
      this._maintenanceService.status=x;
      const dialogRef = this.dialog.open(EditMaintenanceStatusComponent, {});
    }
    openModal() {
      const dialogRef = this.dialog.open(AddMaintenanceStatusComponent, {});
    }
  }
  
