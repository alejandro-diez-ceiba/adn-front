import { Language } from './language.model';
import { Platform } from './platform.model';

export interface Game {
    id: number;
    name: string;
    launch: Date;
    price: number;
    platform: Platform;
    language: Language;
}
