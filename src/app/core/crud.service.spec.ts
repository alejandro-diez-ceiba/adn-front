import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CrudService } from './crud.service';

describe('CrudService', () => {

    let service: CrudService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [CrudService]
        });
        httpMock = TestBed.inject(HttpTestingController);
        service = TestBed.inject(CrudService);
    });

    it('When calling the service it must be injected correctly', () => {
        expect(service).toBeTruthy();
    });

    it('When the findAll() service is consumed, you must create the route and the corresponding method', () => {
        const path = 'user';
        service.findAll(path).subscribe((_) => { });

        const url = `http://localhost:9091/${path}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });

    it('When the findById() service is consumed, you must create the route and the corresponding method', () => {
        const path = 'user';
        const id = 1;
        service.findById(path, id).subscribe((_) => { });

        const url = `http://localhost:9091/${path}/${id}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('GET');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });

    it('When the createOrUpdate() service is consumed, you must create the route and the corresponding method', () => {
        const path = 'user';
        const body = { id: null };
        service.createOrUpdate(path, body).subscribe((_) => { });

        const url = `http://localhost:9091/${path}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('POST');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });

    it('When the delete() service is consumed, you must create the route and the corresponding method', () => {
        const path = 'user';
        const id = 1;
        service.delete(path, id).subscribe((_) => { });

        const url = `http://localhost:9091/${path}/${id}`;
        const req = httpMock.expectOne(url);
        expect(req.request.method).toBe('DELETE');
        expect(req.request.url).toBe(url);
        expect(req.request.responseType).toBe('json');
    });
});
