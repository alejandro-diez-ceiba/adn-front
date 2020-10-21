import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { CrudService, LanguageService, PlatformService } from '@app/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { modulesApp } from './../../constants/module.constants';
import { PlatformServiceMock } from './../../mocks/platform.mock';
import { LanguageServiceMock } from './../../mocks/language.mock';
import { throwError } from 'rxjs';

describe('GameComponent', () => {

  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const crudServiceMock = new CrudServiceMock();
  const platformServiceMock = new PlatformServiceMock();
  const languageServiceMock = new LanguageServiceMock();

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
      declarations: [GameComponent],
      providers: [
        { provide: CrudService, useValue: crudServiceMock },
        { provide: PlatformService, useValue: platformServiceMock },
        { provide: LanguageService, useValue: languageServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.module = modulesApp[0];
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('When the component is rendered and some service fails, it must emit an event', () => {
    const emitEvent = spyOn(component.errorLoad, 'emit');
    spyOn(platformServiceMock, 'getAll').and.returnValue(throwError('error'));
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
      name: 'God of War',
      launch: new Date(),
      price: 150000,
      platform: 1,
      language: 1
    });
    component.save();
    expect(emitEvent).toHaveBeenCalled();
  });
});
