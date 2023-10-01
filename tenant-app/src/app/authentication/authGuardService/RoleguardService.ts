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
  const expectedRole = route.data['expectedRole'];
  const token = localStorage.getItem('Token')!;
  console.log('Token:', token);
  if (token) {
    const tokenPayload: any = decode(token);
    console.log('User Role:', tokenPayload.UserRole);
    console.log('Expected Role:', expectedRole);
    if (
      !this.authGuardService.canActivate() ||
      tokenPayload.UserRole !== expectedRole
    ) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  } else {
    this.router.navigate(['/access-denied']);
    return false;
  }
}
}
