import { Observable, of } from 'rxjs';

export class CrudServiceMock {

    findAll<T>(path: string): Observable<T[]> {
        return of([]);
    }

    findById<T>(path: string, id: number): Observable<T> {
        return of(undefined);
    }

}
