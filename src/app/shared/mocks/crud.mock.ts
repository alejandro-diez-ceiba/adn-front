import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

export class CrudServiceMock {

    data: User[] = [
        {
            id: 1,
            fullName: 'Pepito Perez',
            typeDocument: {
                id: 1,
                description: 'CC'
            },
            document: '123456789',
            password: '123456789'
        }
    ];

    findAll<T>(path: string): Observable<T[]> {
        return of([]);
    }

    findById<T>(path: string, id: number): Observable<T> {
        return of(undefined);
    }

    createOrUpdate<T>(path: string, body: T): Observable<boolean> {
        return of(true);
    }

    delete(path: string, id: number): Observable<boolean> {
        return of(true);
    }
}
