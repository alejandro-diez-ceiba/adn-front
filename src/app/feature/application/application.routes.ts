import { Routes } from '@angular/router';
import { CrudComponent } from '@app/shared';

export const applicationRoutes: Routes = [
    { path: 'user', component: CrudComponent },
    { path: 'customer', component: CrudComponent },
    { path: 'provider', component: CrudComponent },
    { path: 'game', component: CrudComponent },
    { path: 'kardex', component: CrudComponent }
];
