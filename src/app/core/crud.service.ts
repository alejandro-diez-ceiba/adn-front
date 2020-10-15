import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable()
export class CrudService extends BaseService {

  constructor(
    protected readonly http: HttpClient
  ) {
    super(http);
  }

  findAll<T>(path: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.pathService}/${path}`);
  }

  findById<T>(path: string, id: number): Observable<T> {
    return this.http.get<T>(`${this.pathService}/${path}/${id}`);
  }

  createOrUpdate<T>(path: string, body: T): Observable<boolean> {
    console.log(body);
    return this.http.post(`${this.pathService}/${path}`, body, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  delete(path: string, id: number): Observable<boolean> {
    return this.http.delete(`${this.pathService}/${path}/${id}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
