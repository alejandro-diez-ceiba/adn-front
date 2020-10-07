import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  ApplicationComponent,
  LoginComponent,
  applicationRoutes
} from '@components/index';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'app',
    component: ApplicationComponent,
    children: applicationRoutes
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
