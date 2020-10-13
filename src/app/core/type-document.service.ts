import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeDocument } from '@app/shared';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class TypeDocumentService extends BaseService {

  constructor(
    protected readonly http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<TypeDocument[]> {
    return this.http.get<TypeDocument[]>(`${this.pathService}/type-document`);
  }

}
