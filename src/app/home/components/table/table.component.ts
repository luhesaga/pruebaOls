import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../core/services/users/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateComponent } from './../create/create.component';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] =
    [
      'nombres',
      'apellidos',
      'identificacion',
      'rol',
      'estado',
      'telefono',
      'correo',
      'actions'
    ];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
      private userService: UserService,
      public dialog: MatDialog,
      private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.userService
      .listUsers()
      .valueChanges()
      .subscribe(users => (this.dataSource.data = users));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(data): void {
    const email = data.correo;
    const pass = data.password;
    Swal.fire({
      title: '¿Esta seguro?',
      text: 'Esta acción eliminara este usuario permanentemente, no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    })
    .then((result) => {
      if (result.value) {
        this.userService.deleteUser(data.id)
          .then(() => {
            this.auth.deleteUser(email, pass);
            Swal.fire(
              'Eliminado!',
              'Eliminación exitosa.',
              'success',
            );
        })
        .catch((error) => {
          Swal.fire(
            'Error!',
            `La operación no se pudó realizar, ${error}.`,
            'error',
          );
        });
      }
    })
    .catch(error => console.log(error));
  }

  openDialog(data): void {
    const config = {
      data: {
        message: data ? 'Editar usuario' : 'Agregar nuevo usuario',
        content: data
      }
    };

    const dialogRef = this.dialog.open(CreateComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }
}
