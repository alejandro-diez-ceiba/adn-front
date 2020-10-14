import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Provider } from './../../models/provider.model';
import { Module } from './../../models/module.model';
import { TypeDocument } from './../../models/type-document.model';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Provider>();

  form: FormGroup;
  typeDocument: TypeDocument[];
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
    ).subscribe();
  }

  private loadById(): Observable<Provider> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Provider>(this.module.type, this.id);
  }

  private createForm(provider?: Provider): void {
    this.form = new FormGroup({
      fullName: new FormControl(provider?.fullName, []),
      typeDocument: new FormControl(provider?.typeDocument?.id, []),
      document: new FormControl(provider?.document, []),
      address: new FormControl(provider?.address, []),
      phone: new FormControl(provider?.phone, [])
    });
  }

  save(): void {
    this.createOrUpdate.emit(this.form.getRawValue());
  }

}
