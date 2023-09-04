import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../shared/UserModels/Tenant';
import { map, Observable, Subject, of } from 'rxjs';
import { UserTenant } from '../shared/UserModels/UserTenant';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  constructor(private httpClient: HttpClient) {}

  //TENANTS
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  //CREATE
  createTenant(userTenant: UserTenant) {
    //debugger;
    return this.httpClient
      .post(`${this._apiUrl}/User/CreateTenantUser`, userTenant, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //READ
  getTenants(): Observable<Tenant[]> {
    return this.httpClient
      .get<Tenant[]>(`${this._apiUrl}/Tenant/GetAllTenants`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  updateTenantUser(tenantID: number, requestData: any): Observable<any> {
    return this.httpClient.put(
      `${this._apiUrl}/UpdateTenantUser/${tenantID}`,
      requestData,
      {
        headers: this.headers,
      }
    );
  }

  //DELETE
  deleteTenant(tenantID: number) {
    return this.httpClient
      .delete(`${this._apiUrl}/User/DeleteUser/${tenantID}`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //SEARCH
  getTenant(tenantID: number, tenant: Tenant) {
    return this.httpClient
      .post(`${this._apiUrl}/User/GetUserByID/${tenantID}`, tenant, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getTenantByID(tenantID: number): Observable<any> {
    return this.httpClient.get(`${this._apiUrl}/GetTenantByID/${tenantID}`, {
      headers: this.headers,
    });
  }

  uploadTenantDocument(tenantID: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(
      `${this._apiUrl}/UploadTenantDocument/${tenantID}`,
      formData,
      {
        headers: this.headers,
      }
    );
  }

  getTenantDocuments(tenantID: number): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this._apiUrl}/GetTenantDocuments/${tenantID}`,
      {
        headers: this.headers,
      }
    );
  }

  deleteTenantDocument(documentID: number): Observable<any> {
    return this.httpClient.delete(
      `${this._apiUrl}/DeleteTenantDocument/${documentID}`,
      { responseType: 'text', headers: this.headers }
    );
  }
}
