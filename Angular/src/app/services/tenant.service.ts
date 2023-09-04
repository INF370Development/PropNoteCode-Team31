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
  apiUrl = 'https://localhost:7251/api/Tenant';

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

  updateTenantUser(tenantID: number, requestData: any): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/UpdateTenantUser/${tenantID}`, requestData);
  }

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

  getTenantByID(tenantID: number): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/GetTenantByID/${tenantID}`);
  }

  uploadTenantDocument(tenantID: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(`${this.apiUrl}/UploadTenantDocument/${tenantID}`, formData);
  }

  getTenantDocuments(tenantID: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/GetTenantDocuments/${tenantID}`);
  }

  deleteTenantDocument(documentID: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/DeleteTenantDocument/${documentID}`);
  }
}

