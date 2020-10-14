import { Game } from '../models/game.model';
import { Kardex } from '../models/kardex.model';
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
            },
            {
                name: 'platform',
                title: 'Plataforma'
            },
            {
                name: 'language',
                title: 'Idioma'
            }
        ],
        columnsToDisplay: ['name', 'price', 'platform', 'language', 'action'],
        mapData: (game: Game) => {
            return {
                ...game,
                platform: game.platform.name,
                language: game.language.name
            };
        }
    },
    {
        type: 'kardex',
        title: 'Kardex',
        displayedColumns: [
            {
                name: 'type',
                title: 'Tipo'
            },
            {
                name: 'game',
                title: 'Videojuego'
            },
            {
                name: 'quantity',
                title: 'Cantidad'
            },
            {
                name: 'price',
                title: 'Precio'
            }
        ],
        columnsToDisplay: ['type', 'game', 'quantity', 'price', 'action'],
        mapData: (kardex: Kardex) => {
            return {
                ...kardex,
                type: (kardex.entryOrExit) ? 'Entrada' : 'Salida',
                game: kardex.game.name
            };
        }
    }
];
