import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnagList } from '../shared/SnagList'; // Update the import
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnagListService { // Rename the service class
  apiUrl = 'http://localhost:7251/api/';
  public ItemsInAList:any;
  public ListId:any;
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  constructor(private _httpClient: HttpClient) {}

  getSnagLists(): Observable<SnagList[]> { // Rename the method
    return this._httpClient
      .get<SnagList[]>(`https://localhost:7251/api/SnagList/GetAllSnagLists`) // Update the API URL
      .pipe(map((result) => result));
  }

  getSnagList(snaglistID: number, snaglist: SnagList) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/SnagList/GetSnagListByID/${snaglistID}`, // Update the API URL
        snaglist
      )
      .pipe(map((result) => result));
  }

  deleteSnagList(snaglistID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteSnagList/${snaglistID}`) // Update the API URL
      .pipe(map((result) => result));
  }

  createSnagList(snaglist: SnagList) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/SnagList/AddSnagList`, snaglist) // Update the API URL
      .pipe(map((result) => result));
  }
}
