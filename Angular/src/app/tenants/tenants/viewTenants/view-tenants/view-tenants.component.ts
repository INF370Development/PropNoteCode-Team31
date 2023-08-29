import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TenantService } from 'src/app/services/tenant.service';
import { Tenant } from 'src/app/shared/UserModels/Tenant';
import { MatDialog } from '@angular/material/dialog';
import { CreateTenantModalComponent } from './createTenantModal/create-tenant-modal/create-tenant-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { DeleteTenantDialogComponent } from './deleteTenantDialog/delete-tenant-dialog.component';
import { UpdateTenantModalComponent } from './updateTenantModal/update-tenant-modal.component';

@Component({
  selector: 'app-view-tenants',
  templateUrl: './view-tenants.component.html',
  styleUrls: ['./view-tenants.component.scss']
})

export class ViewTenantsComponent implements AfterViewInit, OnInit {


  displayedColumns: string[] = [
    'name',
    'email',
    'phoneNumber',
    'companyName',
    'companyNumber',
    'detailsButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<Tenant>();

  constructor(
    private _tenantService: TenantService,
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
    this._tenantService.getTenants().subscribe((tenants: any) => {
      this.dataSource.data = tenants;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtering based on multiple columns (name, email, etc.)
    this.dataSource.filterPredicate = (data: Tenant, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.user.name.toLowerCase().includes(lowerCaseFilter) ||
        data.user.surname.toLowerCase().includes(lowerCaseFilter) ||
        data.user.email.toLowerCase().includes(lowerCaseFilter) ||
        data.user.phoneNumber.includes(filter) ||
        data.companyName.toLowerCase().includes(lowerCaseFilter) ||
        data.companyNumber.includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

/*async deleteTenant(id: any) {
    await this._tenantService.deleteTenant(id);
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
  }*/

  //Test some time for the modal
  /*openDeleteTenantDialog(tenantID: any) {
    const dialogRef = this.dialog.open(DeleteTenantDialogComponent, {
      data: { tenantID },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.deleteTenant(tenantID);
      }
    });
  }
  
  async deleteTenant(id: any) {
    try {
      await this._tenantService.deleteTenant(id);
      this.showSnackBar('Deleted successfully');
      this.refreshTableData();
    } catch (error) {
      this.showSnackBar('Error deleting tenant', 'error');
    }
  }
  
  showSnackBar(message: string, panelClass: string = 'success') {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(message, 'X', {
      duration: 500,
      panelClass: panelClass,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      this.refreshTableData();
    });
  }*/

  async deleteTenant(tenantID: any) {
    debugger;
    await this._tenantService.deleteTenant(tenantID).toPromise();
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
    this._tenantService.getTenants().subscribe((tenants: any) => {
      this.dataSource.data = tenants;
    });
  }

  openCreateTenantModal() {
    const dialogRef = this.dialog.open(CreateTenantModalComponent);

    dialogRef.afterClosed().subscribe((formData: any) => {
      if (formData) {
        this._tenantService.createTenant(formData).subscribe((newTenant: any) => {
          this.refreshTableData();
          this.cdr.detectChanges();
        });
      }
    });
  }
}
