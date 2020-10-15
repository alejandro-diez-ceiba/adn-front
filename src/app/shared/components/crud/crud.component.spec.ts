import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CrudService } from '@app/core';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('CrudComponent', () => {

  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  const crudServiceMock = new CrudServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [CrudComponent],
      providers: [
        MatDialog,
        {
          provide: Router, useValue: {
            url: '/app/user'
          }
        },
        { provide: CrudService, useValue: crudServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
