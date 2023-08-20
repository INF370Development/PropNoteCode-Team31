import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MaintenanceService } from 'src/app/services/maintenance.service';
import { Maintenance } from 'src/app/shared/Maintenance';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';
import { AssignMaintenanceModalComponent } from './assignMaintenanceModal/assign-maintenance-modal/assign-maintenance-modal.component';

@Component({
  selector: 'app-assign-maintenance',
  templateUrl: './assign-maintenance.component.html',
  styleUrls: ['./assign-maintenance.component.scss']
})
export class AssignMaintenanceComponent implements AfterViewInit, OnInit {

    displayedColumns: string[] = [
      'ID',
      'Maintenance Note',
      'Status',
      'Property',
      'Contractor',
      'Details',
      'Update',
      'Delete',
    ];
  
    dataSource = new MatTableDataSource<Maintenance>();
  
    constructor(
      private _maintenanceService: MaintenanceService,
      private snackBar: MatSnackBar,
      public dialog: MatDialog,
      private cdr: ChangeDetectorRef
    ) {}
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    ngOnInit(): void {
      this._maintenanceService.getMaintenances().subscribe((maintenance: any) => {
        this.dataSource.data = maintenance;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    async deleteMaintenance(id: any) {
      await this._maintenanceService.deleteMaintenances(id);
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
  
    refreshTableData() {
      this._maintenanceService.getMaintenances().subscribe((maintenance: any) => {
        this.dataSource.data = maintenance;
      });
    }

    openAssignMaintenanceModal() {
      const dialogRef = this.dialog.open(AssignMaintenanceModalComponent);
    
      dialogRef.afterClosed().subscribe((formData: any) => {
        if (formData) {
          this._maintenanceService.createMaintenance(formData).subscribe((newTenant: any) => {
            this.refreshTableData();
            this.cdr.detectChanges(); 
          });
        }
      });
    }
  }
