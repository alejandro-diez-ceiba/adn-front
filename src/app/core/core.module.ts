import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './base.service';
import { CrudService } from './crud.service';
import { TypeDocumentService } from './type-document.service';
import { PlatformService } from './platform.service';
import { LanguageService } from './language.service';
import { LoginService } from './login.service';
import { AuthGuardService } from './auth-guard.service';
import { CookieService } from 'ngx-cookie-service';
import { AppGuardService } from './app-guard.service';

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
    LanguageService,
    LoginService,
    AuthGuardService,
    CookieService,
    AppGuardService
  ]
})
export class CoreModule { }
