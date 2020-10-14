import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@app/shared';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';

@Injectable()
export class PlatformService extends BaseService {

  constructor(
    protected readonly http: HttpClient
  ) {
    super(http);
  }

  getAll(): Observable<Platform[]> {
    return this.http.get<Platform[]>(`${this.pathService}/platform`);
  }

}
