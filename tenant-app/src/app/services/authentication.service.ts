import { Injectable, OnInit } from '@angular/core';
import { configuration } from '../config/configurationFile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/UserModels/User';
import { LoginCredentials } from '../authentication/models/LoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  private _apiUrl = configuration.BaseApiUrl;
  private _Token = localStorage.getItem('Token');
  private _userRole: string | null = localStorage.getItem('UserRole');

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this._Token}`,
  });

  constructor(private _httpClient: HttpClient) {}

  getCurrentUserId(): number | null {
    const userId = localStorage.getItem('UserId');
    return userId ? +userId : null;
  }

  isLoggedIn(): boolean {
    return !!this._Token;
  }

  getUserRole(): string | null {
    return this._userRole;
  }

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

  setRole(userRole: string): void {
    this._userRole = userRole;
    localStorage.setItem('UserRole', userRole);
  }

  // Logout method
  logout(): void {
    localStorage.removeItem('Token');
    localStorage.removeItem('UserRole');
    // Add any additional logout logic here (e.g., redirect to login page)
  }

}
