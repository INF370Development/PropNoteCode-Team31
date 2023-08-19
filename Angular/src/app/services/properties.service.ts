import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../shared/Property/Property';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this._httpClient
      .get<Property[]>(
        `https://localhost:7251/api/Property/GetAllProperties`
      )
      .pipe(map((result) => result));
  }

  getProperty(propertyID: number) {
     return this._httpClient
      .get<Property>(`https://localhost:7251/api/Property/GetPropertyByID` + "/" + propertyID);
  }

  deleteProperty(propertyID: number) {
    return this._httpClient
      .delete(
        `https://localhost:7251/api/Property/DeleteProperty` + "/" + propertyID
      )
      .pipe(map((result) => result));
  }

  CreateProperty(property: Property) {
    return this._httpClient
      .post(`https://localhost:7251/api/Property/AddProperty`, property)
      .pipe(map((result) => result));
  }

  uploadPropertyImage(propertyId: number, imageFormData: FormData): Observable<any> {
    return this._httpClient.post(`https://localhost:7251/api/Property/uploadPhoto/${propertyId}`, imageFormData);
  }

}
