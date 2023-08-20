import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, of } from 'rxjs';
import { UserTenant } from '../shared/UserModels/UserTenant';
import { Tenant } from '../shared/UserModels/Tenant';
import { UserContractor } from '../shared/UserModels/UserContractor';
import { Contractor } from '../shared/UserModels/Contractor';

@Injectable({
  providedIn: 'root',
})

export class ContractorService {
  constructor(private httpClient: HttpClient) {}


  //TENANTS
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  //CREATE
  createContractor(userContractor: UserContractor) {
    debugger;
    return this.httpClient
      .post(`https://localhost:7251/api/User/CreateContractorUser`, userContractor)
      .pipe(map((result) => result));
  }

  //READ
  getContractors(): Observable<Contractor[]> {
    return this.httpClient
      .get<Contractor[]>(`https://localhost:7251/api/Contractor/GetAllContractors`)
      .pipe(map((result) => result));
  }

  //UPDATE
  /*updateUser(userID: number) {
    return this.http
      .put<User[]>(`https://localhost:7251/api/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }*/

  //DELETE
  // deleteTenant(tenantID: number) {
  //   return this.httpClient
  //     .delete(`https://localhost:7251/api/User/DeleteUser/${tenantID}`)
  //     .pipe(map((result) => result));
  // }

  // //SEARCH
  // getTenant(tenantID: number, tenant: Tenant) {
  //   return this.httpClient
  //     .post(
  //       `https://localhost:7251/api/User/GetUserByID/${tenantID}`,
  //       tenant
  //     )
  //     .pipe(map((result) => result));
  // }
}
