import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, Subject, of } from 'rxjs';
import { UserTenant } from '../shared/UserModels/UserTenant';
import { Tenant } from '../shared/UserModels/Tenant';
import { UserContractor } from '../shared/UserModels/UserContractor';
import { Contractor } from '../shared/UserModels/Contractor';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})

export class ContractorService {
  constructor(private httpClient: HttpClient) {}

  //CONTRACTORS
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  //CREATE
  createContractor(userContractor: UserContractor) {
    //debugger;
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

  //DELETE
  deleteContractor(contractorID: number) {
    return this.httpClient
      .delete(`https://localhost:7251/api/User/DeleteUser/${contractorID}`)
      .pipe(map((result) => result));
  }

  //SEARCH
  getContractor(contractorID: number, contractor: Contractor) {
    return this.httpClient
      .post(
        `https://localhost:7251/api/User/GetUserByID/${contractorID}`,
        contractor
      )
    .pipe(map((result) => result));
  }

  getContractorU(contractorID: number) {
    return this.httpClient
    .get<Contractor>(`https://localhost:7251/api/Contractor/GetContractorByID` + "/" + contractorID);
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

  //TREE TRY
  getContractorsGroupedBySpecialty(): Observable<Map<string, Contractor[]>> {
    return this.httpClient
      .get<Contractor[]>(`https://localhost:7251/api/Contractor/GetAllContractors`)
      .pipe(
        map((contractors) => {
          const groupedContractors = new Map<string, Contractor[]>();
          contractors.forEach((contractor) => {
            if (!groupedContractors.has(contractor.contractorType.contractorTypeName)) {
              groupedContractors.set(contractor.contractorType.contractorTypeName, []);
            }
            groupedContractors.get(contractor.contractorType.contractorTypeName)?.push(contractor);
          });
          return groupedContractors;
        })
      );
  }

  getContractorsGroupedByLocation(): Observable<Map<string, Contractor[]>> {
    return this.httpClient
      .get<Contractor[]>(`https://localhost:7251/api/Contractor/GetAllContractors`)
      .pipe(
        map((contractors) => {
          const groupedContractors = new Map<string, Contractor[]>();
          contractors.forEach((contractor) => {
            if (!groupedContractors.has(contractor.areaOfBusiness)) {
              groupedContractors.set(contractor.areaOfBusiness, []);
            }
            groupedContractors.get(contractor.areaOfBusiness)?.push(contractor);
          });
          return groupedContractors;
        })
      );
  }

  getContractorsGroupedByAvailability(): Observable<Map<string, Contractor[]>> {
    return this.httpClient
      .get<Contractor[]>(`https://localhost:7251/api/Contractor/GetAllContractors`)
      .pipe(
        map((contractors) => {
          const groupedContractors = new Map<string, Contractor[]>();
          contractors.forEach((contractor) => {
            if (!groupedContractors.has(contractor.availability)) {
              groupedContractors.set(contractor.availability, []);
            }
            groupedContractors.get(contractor.availability)?.push(contractor);
          });
          return groupedContractors;
        })
      );
  }
}