import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ContractorType } from '../shared/UserModels/ContractorType';

@Injectable({
  providedIn: 'root',
})
export class ContractorTypeService {
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getContractorTypes(): Observable<ContractorType[]> {
    return this._httpClient
      .get<ContractorType[]>(`https://localhost:7251/api/Contractor/GetAllContractorTypes`)
      .pipe(map((result) => result));
  }

  getContractorType(ContractorTypeId: number) {
    return this._httpClient
     .get<ContractorType>(`https://localhost:7251/api/Contractor/"GetContractorTypeByID/${ContractorTypeId}"`);
 }

 deleteContractorType(ContractorTypeId: number): Observable<any> {
  return this._httpClient.delete(`https://localhost:7251/api/Contractor/"GetContractorTypeByID/${ContractorTypeId}"`);
}

  createContractorType(conractorType: ContractorType) {
    return this._httpClient
      .post(`https://localhost:7251/api/Broker/AddBroker`, conractorType)
      .pipe(map((result) => result));
  }
}
