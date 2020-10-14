import { TypeDocument } from './type-document.model';

export interface Customer {
    id: number;
    fullName: string;
    typeDocument: TypeDocument;
    document: string;
    address: string;
    phone: string;
}
