import { TypeDocument } from './type-document.model';

export interface Provider {
    fullName: string;
    typeDocument: TypeDocument;
    document: string;
    address: string;
    phone: string;
}
