import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderComponent } from './provider.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CrudServiceMock } from './../../mocks/crud.mock';
import { TypeDocumentServiceMock } from './../../mocks/type-document.mock';
import { CrudService, TypeDocumentService } from '@app/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { modulesApp } from './../../constants/module.constants';

describe('ProviderComponent', () => {

  let component: ProviderComponent;
  let fixture: ComponentFixture<ProviderComponent>;
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
      declarations: [ProviderComponent],
      providers: [
        { provide: CrudService, useValue: crudServiceMock },
        { provide: TypeDocumentService, useValue: typeDocumentServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderComponent);
    component = fixture.componentInstance;
    component.module = modulesApp[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
