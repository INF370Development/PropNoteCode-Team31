  import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
  import { MatPaginator } from '@angular/material/paginator';
  import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
  import { MatSort } from '@angular/material/sort';
  import { MatTableDataSource } from '@angular/material/table';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';
  import { MaintenanceService } from 'src/app/services/maintenance.service';
  import { Snaglistitem } from 'src/app/shared/SnagListItem';
  import { AddMaintenanceTypeComponent } from './add-maintenance-type/add-maintenance-type.component';
  import { MatDialog } from '@angular/material/dialog';
  
  @Component({
    selector: 'app-maintenance-type',
    templateUrl: './maintenance-type.component.html',
    styleUrls: ['./maintenance-type.component.scss']
  })
  export class MaintenanceTypeComponent implements AfterViewInit, OnInit {
    displayedColumns: string[] = [
      'maintenaceTypeName',
      'detailsButton',
      'deleteButton',
    ];
    dataSource = new MatTableDataSource<Snaglistitem>();
  
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
      this._maintenanceService.getMaintenanceTypes().subscribe((MaintenanceTypes: any) => {
        this.dataSource.data = MaintenanceTypes;
      });
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    async deleteSnaglistitem(id: any) {
      await this._maintenanceService.deleteMaintenanceType(id).subscribe();
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
      this.dialog.open(AddMaintenanceTypeComponent, {
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      });
    }
  
    openModal() {
      const dialogRef = this.dialog.open(AddMaintenanceTypeComponent, {});
    }
  }
  