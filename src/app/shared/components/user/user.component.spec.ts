import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { modulesApp } from './../../constants/module.constants';
import { UserComponent } from './user.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { CrudService, TypeDocumentService } from '@app/core';
import { TypeDocumentServiceMock } from './../../mocks/type-document.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';

describe('UserComponent', () => {

  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  const crudServiceMock = new CrudServiceMock();
  const typeDocumentServiceMock = new TypeDocumentServiceMock();

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
      declarations: [UserComponent],
      providers: [
        { provide: CrudService, useValue: crudServiceMock },
        { provide: TypeDocumentService, useValue: typeDocumentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    component.module = modulesApp[0];
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When the component is rendered and some service fails, it must emit an event', () => {
    const emitEvent = spyOn(component.errorLoad, 'emit');
    spyOn(typeDocumentServiceMock, 'getAll').and.returnValue(throwError('error'));
    fixture.detectChanges();
    expect(emitEvent).toHaveBeenCalled();
  });

  it('When the save() method is called and the form is invalid, it should not emit an event', () => {
    const emitEvent = spyOn(component.createOrUpdate, 'emit');
    fixture.detectChanges();
    component.save();
    expect(emitEvent).not.toHaveBeenCalled();
  });

  it('When the save() method is called and the form is valid, it must emit an event', () => {
    const emitEvent = spyOn(component.createOrUpdate, 'emit');
    fixture.detectChanges();
    component.form.patchValue({
      fullName: 'Pepito Perez',
      typeDocument: 1,
      document: 1017248965,
      password: '123456789'
    });
    component.save();
    expect(emitEvent).toHaveBeenCalled();
  });
});
