import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Broker } from '../shared/Broker';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getBrokers(): Observable<Broker[]> {
    return this._httpClient
      .get<Broker[]>(`https://localhost:7251/api/Broker/GetAllBrokers`)
      .pipe(map((result) => result));
  }

  getBroker(brokerID: number) {
    return this._httpClient
      .get(`https://localhost:7251/api/Broker/GetBrokerByID` + '/' + brokerID)
      .pipe(map((result) => result));
  }

  deleteBroker(brokerID: number) {
    return this._httpClient
      .get(`https://localhost:7251/api/Broker/DeleteBroker` + '/' + brokerID)
      .pipe(map((result) => result));
  }

  createBroker() {
    return this._httpClient
      .get(`https://localhost:7251/api/Broker/AddBroker`)
      .pipe(map((result) => result));
  }
}
