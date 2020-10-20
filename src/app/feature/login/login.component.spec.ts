import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieServiceMock, LoginServiceMock } from '@app/shared';
import { LoginService } from '@app/core';
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const loginServiceMock = new LoginServiceMock();
  const cookieServiceMock = new CookieServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        BrowserAnimationsModule
      ],
      declarations: [LoginComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: CookieService, useValue: cookieServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When the hello method is called and the form is invalid, you should not call the service', () => {
    const noCall = spyOn(loginServiceMock, 'login');
    fixture.detectChanges();
    component.login();
    expect(noCall).not.toHaveBeenCalled();
  });

  it('When the login() method is called and the form is valid, you must call the service', () => {
    const callService = spyOn(loginServiceMock, 'login').and.returnValue(of(true));
    fixture.detectChanges();
    component.form.get('document').setValue('1017248996');
    component.form.get('password').setValue('1017248996');
    component.login();
    expect(callService).toHaveBeenCalled();
  });

  it('When the login() method is called and the form is valid and service fail, you should show error', () => {
    spyOn(loginServiceMock, 'login').and.returnValue(of(false));
    fixture.detectChanges();
    component.form.get('document').setValue('1017248996');
    component.form.get('password').setValue('1017248996');
    component.login();
    expect(component.errLogin).toBeTruthy();
  });
});
