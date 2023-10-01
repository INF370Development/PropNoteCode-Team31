// shared/guards/tenant-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class TenantAuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.authService.getUserRole() === 'Tenant') {
      return true;
    } else {
      this.router.navigate(['/access-denied']); // Redirect to an access denied page
      return false;
    }
  }
}
