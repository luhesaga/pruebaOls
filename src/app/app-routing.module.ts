import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardGuard } from './core/guards/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((d) => d.HomeModule),
    canActivate: [GuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
