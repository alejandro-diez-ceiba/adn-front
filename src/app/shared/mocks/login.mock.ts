import { Observable, of } from 'rxjs';
import { LoginModel } from '../models/login.model';

export class LoginServiceMock {

    login(data: LoginModel): Observable<boolean> {
        return of(true);
    }

    logout(): void { }
}
