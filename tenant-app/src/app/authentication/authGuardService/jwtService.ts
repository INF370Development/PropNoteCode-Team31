import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
@Injectable()
export class JwtService {
  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      const currentTime = new Date().getTime() / 1000;

      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Error decoding JWT token:', error);
      return true; // Assume expired if decoding fails
    }
  }
}
