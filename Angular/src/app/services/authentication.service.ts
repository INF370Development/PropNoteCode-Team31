import { Injectable, OnInit } from '@angular/core';
import { configuration } from '../config/configurationFile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCredentials } from '../authentication/models/LoginCredentials';
import { Observable } from 'rxjs';
import { User } from '../shared/UserModels/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    this._Token = localStorage.getItem('Token');
  }

  Login(user: LoginCredentials): Observable<any> {
    return this._httpClient.post(`${this._apiUrl}/Authentication/Login`, user, {
      headers: this.headers,
    });
  }

  UpdateNewUser(user: User): Observable<any> {
    debugger;
    return this._httpClient.post(
      `${this._apiUrl}/Authentication/UpdateNewUser`,
      user,
      {
        headers: this.headers,
      }
    );
  }
}
