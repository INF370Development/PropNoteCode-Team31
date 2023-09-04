import { HttpClient, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
//User service
import { User } from '../shared/UserModels/User';
import { map, Observable, Subject, of } from 'rxjs';
import { configuration } from '../config/configurationFile';
import { CreateUserModel } from '../shared/UserModels/CreateUserModel';
import { KRole } from '../shared/UserModels/KRole';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  Login(user: LoginCredentials) {
    return this.httpClient.post(`${this._apiUrl}/User/Login`, user);
  }

  //CREATE
  /* createUser(user: User) {
    return this.http
      .post(`${this._apiUrl}/User/AddUser`, user)
      .pipe(map((result) => result));
  }*/

  createUser(user: User) {
    return this.http
      .post(`${this._apiUrl}User/AddUser`, user, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  createNewUser(user: CreateUserModel) {
    debugger;
    return this.http.post(
      `${this._apiUrl}/Authentication/CreateNewUser`,
      user,
      {
        headers: this.headers,
      }
    );
  }

  //READ
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this._apiUrl}/User/GetAllUsers`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //UPDATE
  /*updateUser(userID: number) {
    return this.http
      .put<User[]>(`${this._apiUrl}/User/DeleteUser/${userID}`)
      .pipe(map((result) => result));
  }*/

  //DELETE
  deleteUser(userID: number) {
    return this.http
      .delete(`${this._apiUrl}/User/DeleteUser/${userID}`, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  //SEARCH
  getUser(userID: number, user: User) {
    return this.http
      .post(`${this._apiUrl}/User/GetUserByID/${userID}`, user, {
        headers: this.headers,
      })
      .pipe(map((result) => result));
  }

  getRoles(): Observable<KRole[]> {
    return this.http.get<KRole[]>(`${this._apiUrl}/UserRole/GetAllRoles`, {
      headers: this.headers,
    });
  }

  getUserInformation(UserId: number): Observable<User> {
    return this.http.get<User>(
      `${this._apiUrl}/User/GetUserInformation?userId=${UserId}`,
      { headers: this.headers }
    );
  }
}
