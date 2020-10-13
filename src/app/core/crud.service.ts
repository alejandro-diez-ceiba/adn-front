import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}
