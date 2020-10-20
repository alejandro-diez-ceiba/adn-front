import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AppGuardService implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly token: CookieService
  ) { }

  canActivate(): boolean {
    const loginSucces = !this.token.check('token');
    if (!loginSucces) {
      this.router.navigate(['/app']);
    }

    return loginSucces;
  }
}
