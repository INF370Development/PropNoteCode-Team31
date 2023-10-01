import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    debugger;
    const userRole = this.authService.getUserRole();
console.log('User Role:', userRole);
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/access-denied']); // Redirect to an access denied page
      return false;
    }
  }
}
