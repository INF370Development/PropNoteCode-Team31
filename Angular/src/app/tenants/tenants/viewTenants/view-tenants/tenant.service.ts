import { Injectable } from '@angular/core';

interface TenantType {
    email : string;
    name : string;
    surname : string ;
    phone : string ;
    jobTitle : string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  tenantDetails: any[] = [];

  constructor() { }

  public getTenant() {
    return this.tenantDetails;
  }

  public createTenant(data: TenantType) {
    this.tenantDetails.push(data);
  }

  public editTenant(index: number, data: TenantType) {
    this.tenantDetails[index] = data;
  }

  public deleteTenant(index: number) {
    this.tenantDetails.splice(index, 1)
  }
}
