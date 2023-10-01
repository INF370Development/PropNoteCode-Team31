import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ContractorType } from '../shared/UserModels/ContractorType';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class ContractorTypeService {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  constructor(private _httpClient: HttpClient) {}

  getContractorTypes(): Observable<ContractorType[]> {
    return this._httpClient
      .get<ContractorType[]>(
        `${this._apiUrl}/Contractor/GetAllContractorTypes`,
        {
          headers: this.headers,
        }
      )
      .pipe(map((result) => result));
  }

  getContractorType(ContractorTypeId: number) {
    return this._httpClient.get<ContractorType>(
      `${this._apiUrl}/Contractor/"GetContractorTypeByID/${ContractorTypeId}"`,
      {
        headers: this.headers,
      }
    );
  }

  deleteContractorType(ContractorTypeId: number): Observable<any> {
    return this._httpClient.delete(
      `${this._apiUrl}/Contractor/"GetContractorTypeByID/${ContractorTypeId}"`,
      {
        headers: this.headers,
      }
    );
  }

  createContractorType(newContractorType: ContractorType): Observable<ContractorType> {
    debugger;
    const url = `https://localhost:7251/api/Contractor/AddContractorType`;

    return this._httpClient.post<ContractorType>(url, newContractorType);
  }
}
