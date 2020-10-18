import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuardService, AuthGuardService } from './core';
import { ApplicationComponent } from './feature/application/application.component';
import { applicationRoutes } from './feature/application/application.routes';
import { LoginComponent } from './feature/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AppGuardService]
  },
  {
    path: 'app',
    component: ApplicationComponent,
    children: applicationRoutes,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
