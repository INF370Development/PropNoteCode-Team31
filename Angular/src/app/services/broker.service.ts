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

  //CREATE
  createBroker(broker: Broker) {
    return this._httpClient
      .post(`${this._apiUrl}/Broker/AddBroker`, broker, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //READ
  getBrokers(): Observable<Broker[]> {
    return this._httpClient
      .get<Broker[]>(`${this._apiUrl}/Broker/GetAllBrokers`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //UPDATE
  updateBroker(broker: Broker): Observable<any> {
      const url = `${this._apiUrl}/Broker/EditBroker/${broker.brokerID}`;
      return this._httpClient.put(url, broker);
  }

  //DELETE
  deleteBroker(brokerID: number): Observable<any> {
    return this._httpClient.delete(
      `${this._apiUrl}/Broker/DeleteBroker/${brokerID}`,
      {
        headers: this.headers,
      }
    );
  }

  //SEARCH
  getBrokerU(brokerID: number) {
    return this._httpClient.get<Broker>(
      `${this._apiUrl}/Broker/GetBrokerByID` + '/' + brokerID,
      {
        headers: this.headers,
      }
    );
  }

  /*getBroker(brokerID: number, broker: Broker) {
    return this._httpClient
      .post(`${this._apiUrl}/User/GetUserByID/${brokerID}`, broker, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }*/

  getBroker(brokerID: number): Observable<any> {
    return this._httpClient.get(`${this._apiUrl}/Broker/GetBrokerByID/${brokerID}`, {
      headers: this.headers,
    });
  }

  //DOCUMENTS FOR BROKER AGREEMENT
  uploadBrokerDocument(brokerID: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this._httpClient.post(
      `${this._apiUrl}/Tenant/UploadTenantDocument/${brokerID}`,
      formData,
      {
        headers: this.headers,
      }
    );
  }

  getBrokerDocuments(brokerID: number): Observable<any[]> {
    return this._httpClient.get<any[]>(
      `${this._apiUrl}/Tenant/GetTenantDocuments/${brokerID}`,
      {
        headers: this.headers,
      }
    );
  }

  deleteBrokerDocument(documentID: number): Observable<any> {
    return this._httpClient.delete(
      `${this._apiUrl}/Tenant/DeleteTenantDocument/${documentID}`,
      { responseType: 'text', headers: this.headers }
    );
  }

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


   //Chart
   /*getBrokerByCommission(): Observable<Map<string, Broker[]>> {
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
  }*/
}
