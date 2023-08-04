import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
//User service
import { User } from '../shared/User'
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(private httpClient: HttpClient, private http: HttpClient) {}
  
  private _apiUrl = 'https://localhost:7251/api/';

  Login(user: LoginCredentials) {
    return this.httpClient.post(`${this._apiUrl}User/Login`, user);
  }

  //USERS
  apiUrl = 'http://localhost:7251/api/';

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json',
    }),
  };

  //CREATE
  createUser(user: User) {
    return this.http
      .post(`https://localhost:7251/api/User/AddUser`, user)
      .pipe(map((result) => result));
  }

  //READ
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`https://localhost:7251/api/User/getUsers`)
      .pipe(map((result) => result));
  }
  
  //UPDATE
  /*updateUser(userID: number) {
    return this.http
      .put<User[]>(`https://localhost:7251/api/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }*/

  //DELETE
  deleteUser(userID: number) {
    return this.http
      .delete(`https://localhost:7251/api/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }

  //SEARCH
  getUser(userID: number, user: User) {
    return this.http
      .post(
        `https://localhost:7251/api/User/GetUserByID/${userID}`,
        user
      )
      .pipe(map((result) => result));
  }
}