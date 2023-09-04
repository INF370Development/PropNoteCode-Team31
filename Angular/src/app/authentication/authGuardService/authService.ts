import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtService } from './jwtService';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthService {
  constructor(public jwtHelper: JwtHelperService, public router: Router) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Token');
    let result = !this.jwtHelper.isTokenExpired(token);
    return result;
  }
}
