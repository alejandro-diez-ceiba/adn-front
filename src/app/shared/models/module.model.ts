export type TypeModule = 'user' | 'customer' | 'provider' | 'game' | 'kardex';

export interface DisplayColum {
    name: string;
    title: string;
}

export interface Module {
    type: TypeModule;
    title: string;
    displayedColumns: DisplayColum[];
    columnsToDisplay: string[];
}
