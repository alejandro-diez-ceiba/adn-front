import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/core';
import { finalize, mergeMap, tap } from 'rxjs/operators';
import { Module } from './../../models/module.model';
import { modulesApp } from './../../constants/module.constants';
import { DialogComponent } from '../dialog/dialog.component';
import { confirmDelete, errorPersistence, titleApp } from './../../constants/dialog.constants';
import { of, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit, OnDestroy {

  id: number;
  data = [];
  isNew = false;
  errorLoadElements = false;
  loading = true;
  module: Module;
  unsubscribe: Subscription;

  constructor(
    private readonly router: Router,
    private readonly crud: CrudService,
    private readonly dialog: MatDialog,
    private readonly spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    const path = this.router.url.split('/')[2];
    this.module = modulesApp.find((module) => module.type === path);
    this.loadElements();
  }

  get showTable(): boolean {
    return this.data.length > 0 && !this.isNew && !this.errorLoadElements && !this.loading;
  }

  get showError(): boolean {
    return this.errorLoadElements && !this.isNew && !this.loading;
  }

  get showNoData(): boolean {
    return !this.errorLoadElements && !this.isNew && this.data.length === 0 && !this.loading;
  }

  private loadElements(): void {
    this.spinner.show();
    this.crud.findAll(this.module.type).pipe(
      tap((data) => (this.module.mapData)
        ? (this.data = data.map((element) => this.module.mapData(element)))
        : (this.data = data)
      ),
      tap(() => this.errorLoadElements = false),
      finalize(() => {
        this.spinner.hide();
        this.loading = false;
      })
    ).subscribe(() => { }, () => this.errorLoadElements = true);
  }

  private resetId(): void {
    this.id = undefined;
  }

  private setIsNew(isNew: boolean): void {
    this.isNew = isNew;
  }

  newElement(): void {
    this.setIsNew(true);
    this.resetId();
  }

  cancel(): void {
    this.setIsNew(false);
    this.resetId();
  }

  update(id: number): void {
    this.id = id;
    this.setIsNew(true);
  }

  private endProcces(status: boolean): void {
    this.resetId();
    (status)
      ? this.loadElements()
      : this.dialog.open(DialogComponent, {
        data: {
          title: titleApp,
          description: errorPersistence,
          buttons: false
        }
      });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: titleApp,
        description: confirmDelete,
        buttons: true
      }
    });

    this.unsubscribe = dialogRef.afterClosed().pipe(
      mergeMap((confirm: boolean) => (confirm)
        ? this.crud.delete(this.module.type, id) : of(true)
      )
    ).subscribe((status: boolean) => this.endProcces(status));
  }

  onCreateOrUpdate<T>(element: T): void {
    this.setIsNew(false);
    this.crud.createOrUpdate(this.module.type, element)
      .subscribe((status: boolean) => this.endProcces(status));
  }

  ngOnDestroy(): void {
    if (this.unsubscribe) {
      this.unsubscribe.unsubscribe();
    }
  }
}
