import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Provider } from './../../models/provider.model';
import { Module } from './../../models/module.model';
import { TypeDocument } from './../../models/type-document.model';
import { onlyNumber } from './../../constants/pattern.constants';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Provider>();
  @Output() errorLoad = new EventEmitter<void>();

  form: FormGroup;
  typeDocument: TypeDocument[] = [];
  ready = false;

  constructor(
    private readonly crud: CrudService,
    private readonly typeDoc: TypeDocumentService
  ) { }

  ngOnInit(): void {
    this.loadComponent();
  }

  private loadComponent(): void {
    forkJoin([
      this.typeDoc.getAll(),
      this.loadById()
    ]).pipe(
      tap(([typeDocument, provider]: [TypeDocument[], Provider]) => {
        this.typeDocument = typeDocument;
        this.createForm(provider);
        this.ready = true;
      })
    ).subscribe(() => { }, () => this.errorLoad.emit());
  }

  private loadById(): Observable<Provider> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Provider>(this.module.type, this.id);
  }

  private createForm(provider?: Provider): void {
    this.form = new FormGroup({
      fullName: new FormControl(provider?.fullName, [Validators.required, Validators.minLength(5)]),
      typeDocument: new FormControl(provider?.typeDocument?.id, [Validators.required]),
      document: new FormControl(provider?.document, [Validators.required, Validators.minLength(7), Validators.pattern(onlyNumber)]),
      address: new FormControl(provider?.address, [Validators.required, Validators.minLength(5)]),
      phone: new FormControl(provider?.phone, [Validators.required, Validators.minLength(8)])
    });
  }

  save(): void {
    (this.form.valid)
      ? this.createOrUpdate.emit({
        ...this.form.getRawValue(),
        id: (this.id === undefined) ? null : this.id,
        document: parseInt(this.form.get('document').value, 10)
      })
      : this.form.markAllAsTouched();
  }

}
