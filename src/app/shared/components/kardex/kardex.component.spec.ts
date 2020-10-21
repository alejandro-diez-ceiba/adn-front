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
import { throwError } from 'rxjs';

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
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When the component is rendered and some service fails, it must emit an event', () => {
    const emitEvent = spyOn(component.errorLoad, 'emit');
    spyOn(crudServiceMock, 'findAll').and.returnValue(throwError('error'));
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
      transaction: new Date(),
      entryOrExit: true,
      quantity: 5,
      price: 250890,
      provider: 1,
      customer: null,
      game: 1
    });
    component.save();
    expect(emitEvent).toHaveBeenCalled();
  });
});
