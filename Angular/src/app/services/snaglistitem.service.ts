import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Snaglistitem } from '../shared/SnagListItem'; // Update the import
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnaglistitemService { // Rename the service class
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };
  addUser: any;
  editUser: any;

  constructor(private _httpClient: HttpClient) {}

  getSnaglistitems(): Observable<Snaglistitem[]> { // Rename the method
    return this._httpClient
      .get<Snaglistitem[]>(`https://localhost:7251/api/SnagList/GetAllSnaglistitems`) // Update the API URL
      .pipe(map((result) => result));
  }

  getSnaglistitem(snaglistitemID: number, snaglistitem: Snaglistitem) { // Rename the method
    return this._httpClient
      .post(
        `https://localhost:7251/api/SnagList/GetSnaglistitemByID/${snaglistitemID}`, // Update the API URL
        snaglistitem
      )
      .pipe(map((result) => result));
  }

  deleteSnaglistitem(snaglistitemID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteSnagListItem/${snaglistitemID}`) // Update the API URL
      .subscribe(
        () => {
          console.log(`Snag list item with ID ${snaglistitemID} deleted successfully`);
        });
  }

  createSnaglistitem(snaglistitem: Snaglistitem) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/SnagList/AddSnaglistitem`, snaglistitem) // Update the API URL
      .pipe(map((result) => result));
  }
}
