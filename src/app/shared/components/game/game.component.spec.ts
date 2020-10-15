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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
