export type TypeModule = 'user';

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
