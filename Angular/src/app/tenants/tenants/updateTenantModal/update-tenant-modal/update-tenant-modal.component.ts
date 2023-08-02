import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface Tenant {
  id : number;
  email: string;
  name: string;
  surname: string;
  phone: string;
  cname: string;
  cphone: string;
}

@Component({
  selector: 'app-update-tenant-modal',
  templateUrl: './update-tenant-modal.component.html',
  styleUrls: ['./update-tenant-modal.component.scss']
})

export class UpdateTenantModalComponent {

  email: string = '';
  name: string = '';
  surname: string = '';
  phone: string = '';
  cname: string = '';
  cphone: string = '';

  @Output() tenantUpdated: EventEmitter<Tenant> = new EventEmitter<Tenant>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Tenant,
    private dialogRef: MatDialogRef<UpdateTenantModalComponent>
  ) {
    this.email = data.email;
    this.name = data.name;
    this.surname = data.surname;
    this.phone = data.phone;
    this.cname = data.cname;
    this.cphone = data.cphone;
  }

  closeModal() {
    this.dialogRef.close(); 
  }

  updateTenant() {
    const updatedTenant: Tenant = {
      id: this.data.id,
      email: this.data.email,
      name: this.data.name,
      surname : this.data. surname,
      phone : this.data.phone,
      cname : this.data.cname,
      cphone : this.data.cphone
    };
    this.tenantUpdated.emit(updatedTenant);
    this.dialogRef.close();
  }
}
