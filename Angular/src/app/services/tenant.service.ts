import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenant } from '../shared/Tenant';
import { map, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TenantService {
  constructor(private httpClient: HttpClient, private http: HttpClient) {}
  
  private _apiUrl = 'https://localhost:7251/api/';

  //TENANTS
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  //CREATE
  createTenant(formData: any): Observable<any> {
    const apiUrl = 'http://localhost:7251/api/Tenant/createTenant';
    return this.http.post(apiUrl, formData);
  }

  //READ
  getTenants(): Observable<Tenant[]> {
    return this.http
      .get<Tenant[]>(`https://localhost:7251/api/User/getTenants`)
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
    return this.http
      .delete(`https://localhost:7251/api/User/DeleteUser/${tenantID}`)
      .pipe(map((result) => result));
  }

  //SEARCH
  getTenant(tenantID: number, tenant: Tenant) {
    return this.http
      .post(
        `https://localhost:7251/api/User/GetUserByID/${tenantID}`,
        tenant
      )
      .pipe(map((result) => result));
  }
}