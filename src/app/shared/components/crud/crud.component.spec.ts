import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudComponent } from './crud.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CrudService } from '@app/core';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { MatDialogMock } from './../../mocks/mat-dialog.mock';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { of, throwError } from 'rxjs';

describe('CrudComponent', () => {

  let component: CrudComponent;
  let fixture: ComponentFixture<CrudComponent>;
  const crudServiceMock = new CrudServiceMock();
  const matDialogMock = new MatDialogMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        NgxSpinnerModule
      ],
      declarations: [CrudComponent],
      providers: [
        NgxSpinnerService,
        { provide: MatDialog, useValue: matDialogMock },
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
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When the component is initialized and the service responds with empty it should show the message', () => {
    fixture.detectChanges();
    expect(component.data.length).toEqual(0);
  });

  it('When the component is initialized and the service responds with values it should show the table', () => {
    spyOn(crudServiceMock, 'findAll').and.returnValue(of(crudServiceMock.data));
    fixture.detectChanges();
    expect(component.data.length).toEqual(1);
  });

  it('When the component is initialized and the service fails, it should show the error', () => {
    spyOn(crudServiceMock, 'findAll').and.returnValue(throwError('err'));
    fixture.detectChanges();
    expect(component.errorLoadElements).toBeTruthy();
  });

  it('When the newElement() method is called it should render the form', () => {
    fixture.detectChanges();
    component.newElement();
    expect(component.isNew).toBeTruthy();
    expect(component.id).toBeUndefined();
  });

  it('When the cancel() method is called, it must hide the form', () => {
    fixture.detectChanges();
    component.cancel();
    expect(component.isNew).toBeFalsy();
    expect(component.id).toBeUndefined();
  });

  it('When the update() method is called, it must render the form and assign the id', () => {
    fixture.detectChanges();
    component.update(1);
    expect(component.isNew).toBeTruthy();
    expect(component.id).toEqual(1);
  });

  it('When the delete() method is called, it should show the verification alert', () => {
    const callAlert = spyOn(matDialogMock, 'open').and.returnValue(matDialogMock);
    fixture.detectChanges();
    component.delete(1);
    expect(callAlert).toHaveBeenCalled();
  });

  it('When the onCreateOrUpdate() method is called, the form must be closed', () => {
    const callCrud = spyOn(crudServiceMock, 'createOrUpdate').and.returnValue(of(true));
    fixture.detectChanges();
    component.onCreateOrUpdate(undefined);
    expect(component.isNew).toBeFalsy();
    expect(callCrud).toHaveBeenCalled();
  });

  it('When the hello method is called, the form should close and display the error', () => {
    fixture.detectChanges();
    component.onErrorLoad();
    expect(component.id).toBeUndefined();
    expect(component.isNew).toBeFalsy();
    expect(component.errorLoadElements).toBeTruthy();
  });
});
