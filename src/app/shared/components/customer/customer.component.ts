import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { onlyNumber } from './../../constants/pattern.constants';
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
      fullName: new FormControl(customer?.fullName, [Validators.required, Validators.minLength(5)]),
      typeDocument: new FormControl(customer?.typeDocument?.id, [Validators.required]),
      document: new FormControl(customer?.document, [Validators.required, Validators.minLength(7), Validators.pattern(onlyNumber)]),
      address: new FormControl(customer?.address, [Validators.required, Validators.minLength(5)]),
      phone: new FormControl(customer?.phone, [Validators.required, Validators.minLength(8)])
    });
  }

  save(): void {
    (this.form.valid)
      ? this.createOrUpdate.emit({
        ...this.form.getRawValue(),
        id: this.id
      })
      : this.form.markAllAsTouched();
  }

}
