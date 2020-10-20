import { Observable, of } from 'rxjs';
import { Kardex } from '../models/kardex.model';

export class KardexServiceMock {

    getByEntryOrExit(isEntryOrExit: boolean): Observable<Kardex[]> {
        return of([]);
    }
}
