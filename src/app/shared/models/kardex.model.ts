import { Customer } from './customer.model';
import { Game } from './game.model';
import { Provider } from './provider.model';

export interface Kardex {
    id: number;
    transaction: Date;
    entryOrExit: boolean;
    quantity: number;
    price: number;
    provider?: Provider;
    customer?: Customer;
    game: Game;
}
