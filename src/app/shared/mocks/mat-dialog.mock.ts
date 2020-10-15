import { Observable, of } from 'rxjs';

export class MatDialogMock {

    private status: boolean;

    constructor() {
        this.status = false;
    }

    setStatus(status: boolean): void {
        this.status = status;
    }

    open(): MatDialogMock {
        return this;
    }

    afterClosed(): Observable<boolean> {
        return of(this.status);
    }
}
