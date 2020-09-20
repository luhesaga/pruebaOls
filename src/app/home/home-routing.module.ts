import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { NavComponent } from './components/nav/nav.component';
import { CreateComponent } from './components/create/create.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: 'usuario',
        component: TableComponent
      },
      {
        path: 'create',
        component: CreateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
