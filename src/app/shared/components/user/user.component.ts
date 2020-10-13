import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CrudService, TypeDocumentService } from '@app/core';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { Module } from './../../models/module.model';
import { TypeDocument } from './../../models/type-document.model';

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
  ready = false;

  constructor(
    private readonly crud: CrudService,
    private readonly typeDoc: TypeDocumentService
  ) { }

  ngOnInit(): void {
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
    this.form = new FormGroup({
      fullName: new FormControl(user?.fullName, []),
      typeDocument: new FormControl(user?.typeDocument?.id, []),
      document: new FormControl(user?.document, []),
      password: new FormControl(null, [])
    });
  }

  save(): void {
    this.createOrUpdate.emit(this.form.getRawValue());
  }

}
