import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from './../../models/module.model';
import { modulesApp } from './../../constants/module.constants';
import { CrudService } from '@app/core';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  data = [];
  isNew = false;
  module: Module;

  constructor(
    private readonly router: Router,
    private readonly crud: CrudService
  ) { }

  ngOnInit(): void {
    const path = this.router.url.split('/')[2];
    this.module = modulesApp.find((module) => module.type === path);

    this.crud.findAll(this.module.type).pipe(
      tap((data) => this.data = data)
    ).subscribe();
  }

  get showTable(): boolean {
    return this.data.length > 0 && !this.isNew;
  }

  newElement(): void {
    this.isNew = true;

  }

  cancel(): void {
    this.isNew = false;
  }

}
