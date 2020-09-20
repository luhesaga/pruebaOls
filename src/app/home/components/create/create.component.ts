import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../core/services/users/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  // validacion de errores firebase auth
  params = {
    'auth/network-request-failed': 'Error en conexión de red.',
    'auth/too-many-requests': 'Limite de peticiones agotado, intente mas tarde.',
    'auth/email-already-in-use': 'Este email ya esta registrado en la plataforma.',
  };

  nombres;
  apellidos;
  identificacion;
  rol;
  estado;
  telefono;
  correo;
  password;

  // validaciones formulario
  userForm: FormGroup;
  validationMessages = {
    nombres: [
      { type: 'required', message: 'Campo requerido' },
    ],
    apellidos: [
      { type: 'required', message: 'Campo requerido' },
    ],
    identificacion: [
      { type: 'required', message: 'Campo requerido' },
    ],
    rol: [
      { type: 'required', message: 'Campo requerido' },
    ],
    estado: [
      { type: 'required', message: 'Campo requerido' },
    ],
    password: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'minlength', message: 'minimo 6 caracteres' },
    ],
    telefono: [
      { type: 'required', message: 'Campo requerido' },
    ],
    correo: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'email', message: 'Correo invalido' },
    ],
  };

  constructor(
    public dialog: MatDialogRef<CreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      nombres: new FormControl('', Validators.compose([
        Validators.required
      ])
      ),
      apellidos: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      identificacion: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      rol: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      estado: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
      ])
      ),
      telefono: new FormControl('', Validators.compose([
        Validators.required,
      ])
      ),
      correo: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])
      ),
    });
  }

  ngOnInit(): void {
    if (this.data.content) {
      this.nombres = this.data.content.nombres;
      this.apellidos = this.data.content.apellidos;
      this.identificacion = this.data.content.identificacion;
      this.rol = this.data.content.rol;
      this.estado = this.data.content.estado;
      this.telefono = this.data.content.telefono;
      this.correo = this.data.content.correo;
      this.password = atob(this.data.content.password);
    }
  }

  saveUser(data): void {
    if (!this.data.content) {
      const correo = data.correo;
      this.auth.registerUser(correo, data.password)
        .then((res) => {
          this.userService.createUser(data, res.user.uid)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Usuario agregado exitosamente',
                confirmButtonText: 'cerrar',
              });
            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'Ocurrio un error' + error,
                confirmButtonText: 'cerrar',
              });
            });
        })
        .catch((error) => {
          const message = this.printErrorByCode(error.code);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message,
            backdrop: false,
            confirmButtonColor: '#eb445a',
            confirmButtonText: 'cerrar',
          });
        });
    } else {
      this.userService.editUser(data, this.data.content.id)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Exito!',
            text: 'Usuario editado exitosamente',
            confirmButtonText: 'cerrar',
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'Ocurrio un error' + error,
            confirmButtonText: 'cerrar',
          });
        });
    }
  }

  printErrorByCode(code: string): string {
    if (this.params[code]) {
        return (this.params[code]);
    } else {
        return ('Ocurrió un error inesperado. \n Codigo de error: ' + code);
    }
  }

}
