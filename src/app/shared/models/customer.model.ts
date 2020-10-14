import { TypeDocument } from './type-document.model';

export interface Customer {
    fullName: string;
    typeDocument: TypeDocument;
    document: string;
    address: string;
    phone: string;
}
