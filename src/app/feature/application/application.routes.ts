import { Routes } from '@angular/router';
import { CrudComponent } from '@app/shared';
import { DashComponent } from '../dash/dash.component';

export const applicationRoutes: Routes = [
    { path: 'dash', component: DashComponent },
    { path: 'user', component: CrudComponent },
    { path: 'customer', component: CrudComponent },
    { path: 'provider', component: CrudComponent },
    { path: 'game', component: CrudComponent },
    { path: 'kardex', component: CrudComponent },
    { path: '**', redirectTo: 'dash' }
];
