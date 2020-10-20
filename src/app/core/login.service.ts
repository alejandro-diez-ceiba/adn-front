import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from '@app/shared';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class LoginService extends BaseService {

  constructor(
    protected readonly http: HttpClient,
    private readonly token: CookieService,
    private readonly router: Router
  ) {
    super(http);
  }

  login(data: LoginModel): Observable<boolean> {
    return this.http.post(`${this.pathService}/user/${data.document}/${data.password}`, null).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.token.deleteAll('/');
    this.router.navigate(['/login']);
  }
}
