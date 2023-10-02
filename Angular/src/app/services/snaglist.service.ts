import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnagList } from '../shared/SnagList'; // Update the import
import { Snaglistitem } from '../shared/SnagListItem'; 
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnagListService { // Rename the service class
  apiUrl = 'http://localhost:7251/api/';
  public ItemsInAList:any;
  public ListId:any;
  public List:any;
  private _Token = localStorage.getItem('Token');
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });
  ItemID:any;
  LiistID:any;
  constructor(private _httpClient: HttpClient) {}

  getSnaglistitems(): Observable<Snaglistitem[]> { // Rename the method
    return this._httpClient
      .get<Snaglistitem[]>(`https://localhost:7251/api/SnagList/GetAllSnaglistitems`,{
        headers: this.headers,
      })  // Update the API URL
      .pipe(map((result) => result));
  }

  getSnaglistitem(snaglistitemID: number) { // Rename the method
    return this._httpClient
      .get(
        `https://localhost:7251/api/SnagList/GetSnagListItem/${snaglistitemID}` // Update the API URL
      ,{
        headers: this.headers,
      }) 
      .pipe(map((result) => result));
  }

editSnaglistitem(x:any,item: Snaglistitem) { // Rename the method
  return this._httpClient
    .put(`https://localhost:7251/api/SnagList/EditSnagListItem/${x}`, item,{
      headers: this.headers,
    }) // Update the API URL
    .pipe(map((result) => result));
}
  deleteSnaglistitem(snaglistitemID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteSnagListItem/${snaglistitemID}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  createSnaglistitem(snaglistitem: Snaglistitem) { // Rename the method
    return this._httpClient
      .post(`https://localhost:7251/api/SnagList/AddSnaglistitem`, snaglistitem,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }


  getSnagLists(): Observable<SnagList[]> { // Rename the method
    return this._httpClient
      .get<SnagList[]>(`https://localhost:7251/api/SnagList/GetAllSnagLists`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  getSnagList(snaglistID: number): Observable<SnagList> { // Rename the method
    return this._httpClient
      .get<SnagList>(
        `https://localhost:7251/api/SnagList/GetSnagListByID/${snaglistID}`,{
          headers: this.headers,
        }
      )
      .pipe(map((result) => result));
  }

  deleteSnagList(snaglistID: number) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteSnagList/${snaglistID}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }

  createSnagList(snaglist: SnagList) : Observable<SnagList>{ // Rename the method
    return this._httpClient
      .post<SnagList>(`https://localhost:7251/api/SnagList/AddSnagList`, snaglist,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  editSnagList(snaglistID:any,snaglist: SnagList) { // Rename the method
    return this._httpClient
      .put(`https://localhost:7251/api/SnagList/EditSnagList/${snaglistID}`, snaglist,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  getLast():Observable<number> { // Rename the method
    return this._httpClient
      .get<number>(`https://localhost:7251/api/SnagList/lastSnagList`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  addItemtoList(snagList:any,Item:any){
    return this._httpClient
      .post(`https://localhost:7251/api/SnagList/AddItem/${snagList},${Item}`,null,{
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }
  deleteItemsFromList(snagList:any,Item:any) { // Rename the method
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteSnagListItemLine/${snagList},${Item}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  deleteAllitemsinList(SnagListID:any){
    return this._httpClient
      .delete(`https://localhost:7251/api/SnagList/DeleteAllSnagListItemLine/${SnagListID}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  getSnaglistitemsIn(SnagListID:any):Observable<any[]> { // Rename the method
    return this._httpClient
      .get<any[]>(`https://localhost:7251/api/SnagList/GetAllSnagListItemLine/${SnagListID}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
  getSnaglistitemsNot(SnagListID:any):Observable<any[]> { // Rename the method
    return this._httpClient
      .get<any[]>(`https://localhost:7251/api/SnagList/GetSnagListItemnotinList/${SnagListID}`,{
        headers: this.headers,
      }) // Update the API URL
      .pipe(map((result) => result));
  }
}
