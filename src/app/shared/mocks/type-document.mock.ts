import { Observable, of } from 'rxjs';
import { TypeDocument } from '../models/type-document.model';

export class TypeDocumentServiceMock {

    getAll(): Observable<TypeDocument[]> {
        return of([]);
    }

}
