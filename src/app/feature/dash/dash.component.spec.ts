import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KardexService } from '@app/core';
import { KardexServiceMock } from '@app/shared';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashComponent } from './dash.component';

describe('DashComponent', () => {

  let component: DashComponent;
  let fixture: ComponentFixture<DashComponent>;
  const kardexServiceMock = new KardexServiceMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [DashComponent],
      providers: [
        NgxSpinnerService,
        { provide: KardexService, useValue: kardexServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashComponent);
    component = fixture.componentInstance;
  });

  it('When the component is initialized and there are no errors it should render successfully', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
