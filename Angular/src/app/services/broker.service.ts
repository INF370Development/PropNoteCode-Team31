import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Broker } from '../shared/Broker';
import { map, Observable, Subject } from 'rxjs';
import { configuration } from '../config/configurationFile';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  constructor(private _httpClient: HttpClient) {}

  getBrokers(): Observable<Broker[]> {
    return this._httpClient
      .get<Broker[]>(`${this._apiUrl}/Broker/GetAllBrokers`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getBroker(brokerID: number) {
    return this._httpClient.get<Broker>(
      `${this._apiUrl}/Broker/GetBrokerByID` + '/' + brokerID,
      {
        headers: this.headers,
      }
    );
  }

  deleteBroker(brokerID: number): Observable<any> {
    return this._httpClient.delete(
      `${this._apiUrl}/Broker/DeleteBroker/${brokerID}`,
      {
        headers: this.headers,
      }
    );
  }

  createBroker(broker: Broker) {
    return this._httpClient
      .post(`${this._apiUrl}/Broker/AddBroker`, broker, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }
}
