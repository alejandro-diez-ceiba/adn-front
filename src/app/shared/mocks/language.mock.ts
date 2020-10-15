import { Observable, of } from 'rxjs';
import { Language } from '../models/language.model';

export class LanguageServiceMock {

    getAll(): Observable<Language[]> {
        return of([]);
    }

}
