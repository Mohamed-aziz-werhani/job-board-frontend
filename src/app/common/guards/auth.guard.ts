import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';
import { Auth0Service } from 'src/app/services/auth0.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: Auth0Service,
    private router: Router
  ) { }

  canActivate() {
    return this.authService.isAuthenticated$
      .pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['/jobs']);
            return false;
          }
          return true;
        })
      );
  }
}
