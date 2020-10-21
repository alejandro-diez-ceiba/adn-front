import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { KardexService } from './kardex.service';

describe('KardexService', () => {

    let service: KardexService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [KardexService]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(KardexService);
    });

    it('When calling the service it must be injected correctly', () => {
        expect(service).toBeTruthy();
    });

    it('When the getByEntryOrExit() service is consumed, you must create the route and the corresponding method', () => {
        const path = true;
        service.getByEntryOrExit(path).subscribe((_) => { });

        const url = `http://localhost:9091/kardex/dash/${1}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });
});
