import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  // validaciones formulario
  validationMessages = {
    email: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'email', message: 'Este no es un email válido' }
    ],
    password: [
      { type: 'required', message: 'Campo requerido' },
      { type: 'minlength', message: 'Debe tener minimo 6 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])
      ),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
      ),
    });
  }

  ngOnInit(): void {}

  loginUser(data): void {
    const email = data.email;
    const pass = data.password;
    this.authService.loginUser(email, pass)
      .then((res) => {
        console.log(res);
        Swal.fire({
          html: '<h1 style="color: white;">Estamos preparando todo para ti</h1>',
          background: 'rgba(0,0,0,.5)',
          timer: 1000,
          timerProgressBar: false,
          onBeforeOpen: () => {
            Swal.showLoading();
          }});
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: '¡usuario o contraseña invalidos!',
          confirmButtonText: 'cerrar',
        });
      });
  }

}
