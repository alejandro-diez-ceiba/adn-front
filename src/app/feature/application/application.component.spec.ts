import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationComponent } from './application.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginServiceMock } from '@app/shared';
import { LoginService } from '@app/core';

describe('ApplicationComponent', () => {

  let component: ApplicationComponent;
  let fixture: ComponentFixture<ApplicationComponent>;
  const loginServiceMock = new LoginServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule
      ],
      declarations: [ApplicationComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationComponent);
    component = fixture.componentInstance;
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
