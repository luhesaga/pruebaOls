import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  selectedRol: string;
  roles = [
    {value: 'Administrador', viewValue: 'Administrador'},
    {value: 'Conductor', viewValue: 'Conductor'},
    {value: 'Recolector', viewValue: 'Recolector'},
    {value: 'Digitador CG-UNO', viewValue: 'Digitador CG-UNO'}
  ];

  selectedState: string;
  estados = [
    {value: 'Activo', viewValue: 'Activo'},
    {value: 'Inactivo', viewValue: 'Inactivo'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
