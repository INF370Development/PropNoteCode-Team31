import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../shared/UserModels/Tenant';
import { map, Observable, Subject, of } from 'rxjs';
import { UserTenant } from '../shared/UserModels/UserTenant';

@Injectable({
  providedIn: 'root',
})

export class TenantService {
  constructor(private httpClient: HttpClient) {}

  //TENANTS
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  //CREATE
  createTenant(userTenant: UserTenant) {
    //debugger;
    return this.httpClient
      .post(`https://localhost:7251/api/User/CreateTenantUser`, userTenant)
      .pipe(map((result) => result));
  }

  //READ
  getTenants(): Observable<Tenant[]> {
    return this.httpClient
      .get<Tenant[]>(`https://localhost:7251/api/Tenant/GetAllTenants`)
      .pipe(map((result) => result));
  }

  //UPDATE
  /*updateUser(userID: number) {
    return this.http
      .put<User[]>(`https://localhost:7251/api/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }*/

  //DELETE
  deleteTenant(tenantID: number) {
    return this.httpClient
      .delete(`https://localhost:7251/api/User/DeleteUser/${tenantID}`)
      .pipe(map((result) => result));
  }

  //SEARCH
  getTenant(tenantID: number, tenant: Tenant) {
    return this.httpClient
      .post(
        `https://localhost:7251/api/User/GetUserByID/${tenantID}`,
        tenant
      )
      .pipe(map((result) => result));
  }

  getTenantU(tenantID: number) {
    return this.httpClient
     .get<Tenant>(`https://localhost:7251/api/Tenant/GetTenantByID` + "/" + tenantID);
  }
}
