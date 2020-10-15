import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KardexComponent } from './kardex.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { CrudService } from '@app/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { modulesApp } from './../../constants/module.constants';

describe('KardexComponent', () => {

  let component: KardexComponent;
  let fixture: ComponentFixture<KardexComponent>;
  const crudServiceMock = new CrudServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      declarations: [KardexComponent],
      providers: [
        { provide: CrudService, useValue: crudServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KardexComponent);
    component = fixture.componentInstance;
    component.module = modulesApp[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
