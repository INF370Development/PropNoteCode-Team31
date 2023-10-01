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

   //Chart 
   getBrokerByCommission(): Observable<Map<string, Broker[]>> {
    return this._httpClient
      .get<Broker[]>(`${this._apiUrl}/Broker/GetAllBrokers`, {
        headers: this.headers,
      })
      .pipe(
        map((brokers) => {
          const groupedBrokers = new Map<string, Broker[]>();
          brokers.forEach((broker) => {
            const commissionRateKey = broker.commissionRate.toString(); // Convert to string
            if (!groupedBrokers.has(commissionRateKey)) {
              groupedBrokers.set(commissionRateKey, []);
            }
            groupedBrokers.get(commissionRateKey)?.push(broker);
          });
          return groupedBrokers;
        })
      );
  }
  

  getBrokerByName(): Observable<Map<string, Broker[]>> {
    return this._httpClient
      .get<Broker[]>(`${this._apiUrl}/Broker/GetAllBrokers`, {
        headers: this.headers,
      })
      .pipe(
        map((brokers) => {
          const groupedBrokers = new Map<string, Broker[]>();
          brokers.forEach((broker) => {
            if (!groupedBrokers.has(broker.name)) {
              groupedBrokers.set(broker.name, []);
            }
            groupedBrokers.get(broker.name)?.push(broker);
          });
          return groupedBrokers;
        })
      );
  }

  getBrokerBySurname(): Observable<Map<string, Broker[]>> {
    return this._httpClient
      .get<Broker[]>(`${this._apiUrl}/Broker/GetAllBrokers`, {
        headers: this.headers,
      })
      .pipe(
        map((brokers) => {
          const groupedBrokers = new Map<string, Broker[]>();
          brokers.forEach((broker) => {
            if (!groupedBrokers.has(broker.surname)) {
              groupedBrokers.set(broker.surname, []);
            }
            groupedBrokers.get(broker.surname)?.push(broker);
          });
          return groupedBrokers;
        })
      );
  }
}
