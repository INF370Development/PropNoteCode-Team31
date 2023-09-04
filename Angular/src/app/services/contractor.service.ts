import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { UserTenant } from '../shared/UserModels/UserTenant';
import { Tenant } from '../shared/UserModels/Tenant';
import { UserContractor } from '../shared/UserModels/UserContractor';
import { Contractor } from '../shared/UserModels/Contractor';
import { map } from 'rxjs/operators';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class ContractorService {
  value: any;
  constructor(private httpClient: HttpClient) {}

  //CONTRACTORS
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  //CREATE
  createContractor(userContractor: UserContractor) {
    //debugger;
    return this.httpClient
      .post(`${this._apiUrl}/User/CreateContractorUser`, userContractor, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //READ
  getContractors(): Observable<Contractor[]> {
    return this.httpClient
      .get<Contractor[]>(`${this._apiUrl}/Contractor/GetAllContractors`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //DELETE
  deleteContractor(contractorID: number) {
    return this.httpClient
      .delete(`${this._apiUrl}/User/DeleteUser/${contractorID}`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //SEARCH
  getContractor(contractorID: number, contractor: Contractor) {
    return this.httpClient
      .post(`${this._apiUrl}/User/GetUserByID/${contractorID}`, contractor, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getContractorU(contractorID: number) {
    return this.httpClient.get<Contractor>(
      `${this._apiUrl}/Contractor/GetContractorByID` + '/' + contractorID,
      {
        headers: this.headers,
      }
    );
  }

  //UPDATE
  /*updateUser(userID: number) {
    return this.http
      .put<User[]>(`${this._apiUrl}/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }*/

  //DELETE
  // deleteTenant(tenantID: number) {
  //   return this.httpClient
  //     .delete(`${this._apiUrl}/User/DeleteUser/${tenantID}`)
  //     .pipe(map((result) => result));
  // }

  // //SEARCH
  // getTenant(tenantID: number, tenant: Tenant) {
  //   return this.httpClient
  //     .post(
  //       `${this._apiUrl}/User/GetUserByID/${tenantID}`,
  //       tenant
  //     )
  //     .pipe(map((result) => result));
  // }

  //TREE TRY
  getContractorsGroupedBySpecialty(): Observable<Map<string, Contractor[]>> {
    return this.httpClient
      .get<Contractor[]>(`${this._apiUrl}/Contractor/GetAllContractors`, {
        headers: this.headers,
      })
      .pipe(
        map((contractors) => {
          const groupedContractors = new Map<string, Contractor[]>();
          contractors.forEach((contractor) => {
            if (
              !groupedContractors.has(
                contractor.contractorType.contractorTypeName
              )
            ) {
              groupedContractors.set(
                contractor.contractorType.contractorTypeName,
                []
              );
            }
            groupedContractors
              .get(contractor.contractorType.contractorTypeName)
              ?.push(contractor);
          });
          return groupedContractors;
        })
      );
  }

  getContractorsGroupedByLocation(): Observable<Map<string, Contractor[]>> {
    return this.httpClient
      .get<Contractor[]>(`${this._apiUrl}/Contractor/GetAllContractors`, {
        headers: this.headers,
      })
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
      .get<Contractor[]>(`${this._apiUrl}/Contractor/GetAllContractors`, {
        headers: this.headers,
      })
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
