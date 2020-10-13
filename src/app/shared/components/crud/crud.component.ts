import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrudService } from '@app/core';
import { tap } from 'rxjs/operators';
import { Module } from './../../models/module.model';
import { modulesApp } from './../../constants/module.constants';
import { DialogComponent } from '../dialog/dialog.component';
import { confirmDelete, titleApp } from './../../constants/dialog.constants';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  id: number;
  data = [];
  isNew = false;
  module: Module;

  constructor(
    private readonly router: Router,
    private readonly crud: CrudService,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const path = this.router.url.split('/')[2];
    this.module = modulesApp.find((module) => module.type === path);
    this.loadElements();
  }

  get showTable(): boolean {
    return this.data.length > 0 && !this.isNew;
  }

  private loadElements(): void {
    this.crud.findAll(this.module.type).pipe(
      tap((data) => this.data = data)
    ).subscribe();
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

  delete(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: titleApp,
        description: confirmDelete
      }
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => {

    });
  }

  onCreateOrUpdate<T>(element: T): void {
    this.setIsNew(false);
  }

}
