import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  private _apiUrl = 'https://localhost:7251/api/';

  Login(user: LoginCredentials) {
    return this.httpClient.post(`${this._apiUrl}User/Login`, user);
  }
}
