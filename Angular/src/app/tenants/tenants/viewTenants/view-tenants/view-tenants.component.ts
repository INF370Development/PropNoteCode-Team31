import { Component, ViewChild } from '@angular/core';
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
}