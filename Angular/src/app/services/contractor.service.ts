import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contractor } from '../shared/Contractor';
import { map, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ContractorService {
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getContractors(): Observable<Contractor[]> {
    return this._httpClient
      .get<Contractor[]>(`${this.apiUrl}/Contractor/GetAllContractors`);
  }

  /*getContractor(): Observable<Contractor[]> {
    return this._httpClient.get<Contractor[]>('your_api_endpoint_here');
  }*/

  getContractor(contractorID: number, contractor: Contractor) {
    return this._httpClient
      .post(
        `https://localhost:7251/api/Contractor/GetContractorByID/${contractorID}`,
        contractor
      )
      .pipe(map((result) => result));
  }

  deleteContractor(contractorID: number) {
    return this._httpClient
      .delete(`https://localhost:7251/api/Contractor/DeleteContractor/${contractorID}`)
      .pipe(map((result) => result));
  }

  createContractor(contractor: Contractor) {
    return this._httpClient
      .post(`https://localhost:7251/api/Contractor/AddContractor`, contractor)
      .pipe(map((result) => result));
  }
}
