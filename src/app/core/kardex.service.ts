import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kardex } from '@app/shared';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class KardexService extends BaseService {

  constructor(
    protected readonly http: HttpClient
  ) {
    super(http);
  }

  getByEntryOrExit(isEntryOrExit: boolean): Observable<Kardex[]> {
    return this.http.get<Kardex[]>(`${this.pathService}/kardex/dash/${this.toNumber(isEntryOrExit)}`).pipe(
      catchError(() => of([]))
    );
  }

  private toNumber(status: boolean): number {
    return (status) ? 1 : 0;
  }
}
