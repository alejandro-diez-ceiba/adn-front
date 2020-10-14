import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Customer } from './../../models/customer.model';
import { Module } from './../../models/module.model';
import { TypeDocument } from './../../models/type-document.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<Customer>();

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
      tap(([typeDocument, customer]: [TypeDocument[], Customer]) => {
        this.typeDocument = typeDocument;
        this.createForm(customer);
        this.ready = true;
      })
    ).subscribe();
  }

  private loadById(): Observable<Customer> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<Customer>(this.module.type, this.id);
  }

  private createForm(customer?: Customer): void {
    this.form = new FormGroup({
      fullName: new FormControl(customer?.fullName, []),
      typeDocument: new FormControl(customer?.typeDocument?.id, []),
      document: new FormControl(customer?.document, []),
      address: new FormControl(customer?.address, []),
      phone: new FormControl(customer?.phone, [])
    });
  }

  save(): void {
    this.createOrUpdate.emit(this.form.getRawValue());
  }

}
