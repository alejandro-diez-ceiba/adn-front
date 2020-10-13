import { Module } from '../models/module.model';

export const modulesApp: Module[] = [
    {
        type: 'user',
        title: 'Usuarios',
        displayedColumns: [
            {
                name: 'fullName',
                title: 'Nombre'
            },
            {
                name: 'document',
                title: 'Nro. Documento'
            }
        ],
        columnsToDisplay: ['fullName', 'document', 'action']
    }
];
