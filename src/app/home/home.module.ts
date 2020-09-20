import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LayoutModule } from '@angular/cdk/layout';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { CreateComponent } from './components/create/create.component';
import { FiltersComponent } from './components/filters/filters.component';


@NgModule({
  declarations: [TableComponent, NavComponent, CreateComponent, FiltersComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
