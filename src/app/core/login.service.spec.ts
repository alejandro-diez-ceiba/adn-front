import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginModel } from '@app/shared';

describe('LoginService', () => {

    let service: LoginService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [LoginService]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LoginService);
    });

    it('When calling the service it must be injected correctly', () => {
        expect(service).toBeTruthy();
    });

    it('When the getAll() service is consumed, you must create the route and the corresponding method', () => {
        const data: LoginModel = {
            document: 123,
            password: '123'
        };
        service.login(data).subscribe((_) => { });

        const url = `http://localhost:9091/user/${data.document}/${data.password}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });
});
