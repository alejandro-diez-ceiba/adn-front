import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@app/core';
import { onlyNumber } from '@app/shared';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  errLogin = false;

  constructor(
    private readonly loginSv: LoginService,
    private readonly token: CookieService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = new FormGroup({
      document: new FormControl(null, [Validators.required, Validators.minLength(7), Validators.pattern(onlyNumber)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login(): void {
    (this.form.valid)
      ? this.loginSv.login(this.form.getRawValue()).pipe(
        tap((token: boolean) => {
          if (token) {
            this.token.set('token', 'ok');
            this.errLogin = false;
            this.router.navigate(['app']);
          } else {
            this.errLogin = true;
          }
        })
      ).subscribe()
      : this.form.markAsTouched();
  }

}
