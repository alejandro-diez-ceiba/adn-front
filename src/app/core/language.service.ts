import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Language } from '@app/shared';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class LanguageService extends BaseService {

  constructor(
    protected readonly http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.pathService}/language`);
  }

}
