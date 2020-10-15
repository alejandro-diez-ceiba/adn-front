import { TypeDocument } from './type-document.model';

export interface User {
    id: number;
    fullName: string;
    typeDocument: TypeDocument;
    document: string;
    password: string;
}
