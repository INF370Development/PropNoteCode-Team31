import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import decode from 'jwt-decode';
import { JwtService } from './jwtService';
import { AuthGuardService } from './authGuardService';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public authGuardService: AuthGuardService,
    public router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('Token')!;
    if (token) {
      // decode the token to get its payload
      const tokenPayload: any = decode(token);
      if (
        !this.authGuardService.canActivate() ||
        tokenPayload.UserRole !== expectedRole
      ) {
        this.router.navigate(['/landingPage']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/landingPage']);
      return false;
    }
  }
}
