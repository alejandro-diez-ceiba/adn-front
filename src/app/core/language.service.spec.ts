import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LanguageService } from './language.service';

describe('LanguageService', () => {

    let service: LanguageService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [LanguageService]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(LanguageService);
    });

    it('When calling the service it must be injected correctly', () => {
        expect(service).toBeTruthy();
    });

    it('When the getAll() service is consumed, you must create the route and the corresponding method', () => {

        service.getAll().subscribe((_) => { });

        const url = `http://localhost:9091/language`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });
});
