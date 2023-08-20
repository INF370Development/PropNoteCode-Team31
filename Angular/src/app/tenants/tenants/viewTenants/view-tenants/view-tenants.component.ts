import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TenantService } from 'src/app/services/tenant.service';
import { Tenant } from 'src/app/shared/Tenant';
import { MatDialog } from '@angular/material/dialog';
import { CreateTenantModalComponent } from './createTenantModal/create-tenant-modal/create-tenant-modal.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-view-tenants',
  templateUrl: './view-tenants.component.html',
  styleUrls: ['./view-tenants.component.scss']
})

export class ViewTenantsComponent implements AfterViewInit, OnInit {


  displayedColumns: string[] = [
    'Name',
    'Surname',
    'Email',
    'Phone Number',
    'Company Name',
    'Company Number',
    'Update',
    'Delete',
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteTenant(id: any) {
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
