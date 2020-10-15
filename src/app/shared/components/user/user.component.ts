import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { Module } from './../../models/module.model';
import { TypeDocument } from './../../models/type-document.model';
import { onlyNumber } from './../../constants/pattern.constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() id: number;
  @Input() module: Module;
  @Output() createOrUpdate = new EventEmitter<User>();

  form: FormGroup;
  typeDocument: TypeDocument[];
  element: User;
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
      tap(([typeDocument, user]: [TypeDocument[], User]) => {
        this.typeDocument = typeDocument;
        this.createForm(user);
        this.ready = true;
      })
    ).subscribe();
  }

  private loadById(): Observable<User> {
    return (!this.id)
      ? of(undefined)
      : this.crud.findById<User>(this.module.type, this.id);
  }

  private createForm(user?: User): void {
    this.element = user;
    const isRequeridPass = (!this.id)
      ? [Validators.required] : [];

    this.form = new FormGroup({
      fullName: new FormControl(user?.fullName, [Validators.required, Validators.minLength(5)]),
      typeDocument: new FormControl(user?.typeDocument?.id, [Validators.required]),
      document: new FormControl(user?.document, [Validators.required, Validators.minLength(7), Validators.pattern(onlyNumber)]),
      password: new FormControl(null, [...isRequeridPass, Validators.minLength(6)])
    });
  }

  save(): void {
    const passValue = this.form.get('password').value;
    const pass = (this.id && !passValue)
      ? this.element.password : passValue;

    (this.form.valid)
      ? this.createOrUpdate.emit({
        ...this.form.getRawValue(),
        id: (this.id === undefined) ? null : this.id,
        password: pass,
        document: parseInt(this.form.get('document').value, 10)
      })
      : this.form.markAllAsTouched();
  }

}
