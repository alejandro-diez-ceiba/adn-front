import { Observable, of } from 'rxjs';
import { Platform } from '../models/platform.model';

export class PlatformServiceMock {

    getAll(): Observable<Platform[]> {
        return of([]);
    }

}
