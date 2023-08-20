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
import { DeleteTenantDialogComponent } from '../../deleteTenantDialog/delete-tenant-dialog/delete-tenant-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-tenants',
  templateUrl: './view-tenants.component.html',
  styleUrls: ['./view-tenants.component.scss']
})

export class ViewTenantsComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    'id',
    'email',
    'name',
    'surname',
    'phone',
    'jobTitle',
    'updateButton',
    'deleteButton',
  ];

  dataSource = new MatTableDataSource<Tenant>();

  constructor(
    private _tenantService: TenantService,
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
    this._tenantService.getTenants().subscribe((tenants: any) => {
      this.dataSource.data = tenants;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async deleteTenant(id: any) {
    const dialogRef: MatDialogRef<DeleteTenantDialogComponent> = this.dialog.open(DeleteTenantDialogComponent, {
      width: '300px',
      data: {
        tenantId: id
      }
    });

    dialogRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._tenantService.deleteTenant(id);
          this.dataSource.data = this.dataSource.data.filter((tenant) => tenant.id !== id);
          this.showSnackBar('Deleted successfully'); // Use the 'showSnackBar' method
        } catch (error) {
          console.error('Error deleting tenant:', error);
          this.showSnackBar('Error deleting tenant', true);
        }
      }
    });
  }

  showSnackBar(message: string, isError = false) {
    const panelClass = isError ? 'error-snackbar' : '';
  
    this.snackBar.open(message, 'X', {
      duration: 5000,
      panelClass: panelClass,
    }).afterDismissed().subscribe(() => {
      location.reload();
    });
  }
}

/*import { Component, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DeleteTenantDialogComponent } from '../../deleteTenantDialog/delete-tenant-dialog/delete-tenant-dialog.component';
import { UpdateTenantModalComponent } from '../../updateTenantModal/update-tenant-modal/update-tenant-modal.component';

NgModule({
  imports: [
  import { Tenant } from './../../updateTenantModal/update-tenant-modal/update-tenant-modal.component';
  MatDialogModule,
    FormsModule, 
    MatInputModule, 
    MatButtonModule],
  })
  
  export interface DialogData {
    id : number;
    email: string;
    name: string;
    surname: string;
    phone: string;
    jobTitle: string;
  }
  
  interface Tenant {
    id : number;
    email: string;
    name: string;
    surname: string;
    phone: string;
    cname: string;
    cphone : string;
  }

@Component({
  selector: 'app-view-tenants',
  templateUrl: './view-tenants.component.html',
  styleUrls: ['./view-tenants.component.scss']
})

export class ViewTenantsComponent {

  tenant: Tenant [] = [
    {id: 1, email: 'johndoe@propco.co.za', name: 'John', surname: 'Doe', phone: '0798903590', cname: 'Administator', cphone: '0124567891'},
    {id: 2, email: 'brandon@propco.co.za', name: 'Brandon', surname: 'Driver', phone: '0834477955', cname: 'Asset Manager', cphone: ''},
  ];

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ViewTenantsComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //Delete Dialog
  openDeleteTenantDialog(tenant: Tenant): void {
    const dialogRef = this.dialog.open(DeleteTenantDialogComponent, {
      width: '300px',
      data: tenant
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.tenant = this.tenant.filter(u => u.id !== tenant.id);
        this.filtered = this.filtered.filter(u => u.id !== tenant.id);
      }
    });
  }

  //Update Modal
  openUpdateTenantModal(tenant: Tenant): void {
    const dialogRef = this.dialog.open(UpdateTenantModalComponent, {
      data: tenant
    });

    dialogRef.componentInstance.tenantUpdated.subscribe((updatedTenant: Tenant) => {
      const index = this.tenant.findIndex(u => u.id === updatedTenant.id);
      if (index !== -1) {
        this.tenant[index] = updatedTenant;
        this.filtered = this.tenant.filter(u => u.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    });
  }

  //Search
    searchTerm: string = '';
    filtered: Tenant [] = [];
    
    constructor(public dialog: MatDialog) {
      this.filtered = this.tenant;
    }
  
    search() {
      this.filtered = this.tenant.filter(u => {
        const searchLower = this.searchTerm.toLowerCase();
        const tenantNameLower = u.name.toLowerCase(); // Use 'roleName', not 'role'
        return tenantNameLower.includes(searchLower);
      });
    }
}*/