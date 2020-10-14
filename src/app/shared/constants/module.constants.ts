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
    },
    {
        type: 'customer',
        title: 'Clientes',
        displayedColumns: [
            {
                name: 'fullName',
                title: 'Nombre'
            },
            {
                name: 'document',
                title: 'Nro. Documento'
            },
            {
                name: 'address',
                title: 'Dirección'
            },
            {
                name: 'phone',
                title: 'Celular'
            }
        ],
        columnsToDisplay: ['fullName', 'document', 'address', 'phone', 'action']
    },
    {
        type: 'provider',
        title: 'Proveedores',
        displayedColumns: [
            {
                name: 'fullName',
                title: 'Nombre'
            },
            {
                name: 'document',
                title: 'Nro. Documento'
            },
            {
                name: 'address',
                title: 'Dirección'
            },
            {
                name: 'phone',
                title: 'Celular'
            }
        ],
        columnsToDisplay: ['fullName', 'document', 'address', 'phone', 'action']
    },
    {
        type: 'game',
        title: 'Videojuegos',
        displayedColumns: [
            {
                name: 'name',
                title: 'Nombre'
            },
            {
                name: 'price',
                title: 'Precio'
            }
        ],
        columnsToDisplay: ['name', 'price', 'action']
    },
    {
        type: 'kardex',
        title: 'Kardex',
        displayedColumns: [
            {
                name: 'quantity',
                title: 'Cantidad'
            },
            {
                name: 'price',
                title: 'Precio'
            }
        ],
        columnsToDisplay: ['quantity', 'price', 'action']
    }
];
