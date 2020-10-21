import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TypeDocumentService } from './type-document.service';

describe('PlatformService', () => {

    let service: TypeDocumentService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [TypeDocumentService]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(TypeDocumentService);
    });

    it('When calling the service it must be injected correctly', () => {
        expect(service).toBeTruthy();
    });

    it('When the getAll() service is consumed, you must create the route and the corresponding method', () => {

        service.getAll().subscribe((_) => { });

        const url = `http://localhost:9091/type-document`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });
});
