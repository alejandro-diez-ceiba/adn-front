import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './base.service';
import { CrudService } from './crud.service';
import { TypeDocumentService } from './type-document.service';
import { PlatformService } from './platform.service';
import { LanguageService } from './language.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    BaseService,
    CrudService,
    TypeDocumentService,
    PlatformService,
    LanguageService
  ]
})
export class CoreModule { }
