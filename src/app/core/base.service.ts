import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseService {

  protected readonly pathService = 'http://localhost:9091';

  constructor(
    protected readonly http: HttpClient
  ) { }

}
